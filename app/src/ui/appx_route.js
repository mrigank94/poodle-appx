const fs = require('fs')
const path = require('path')
const objPath = require("object-path")
const { SUCCESS, FAILURE, REGEX_VAR } = require('../api/util')
const prettier = require("prettier")
const babel = require('@babel/standalone')
const generate = require('@babel/generator').default
const t = require("@babel/types")
const {
    reg_js_variable,
    reg_js_import,
    js_resolve_ids,
    isPrimitive,
    capitalize,
} = require('./util_base')
const {
    react_component,
    react_element,
} = require('./util_code')
const db = require('../db/db')

/**
 * handle_appx_route
 */
async function handle_appx_route(req, res) {

    try {
        // console.log(req.context)

        if (! ('ui_spec' in req.context)
            || ! (req.context.ui_spec.importMaps)
        ) {
            return {
                status: 422,
                type: 'application/json',
                data: {
                    status: FAILURE,
                    message: `ERROR: ui_spec.importMaps not defined [${req.context.ui_spec}]`
                }
            }
        }

        if (! ('ui_route_spec' in req.context)
            || ! (req.context.ui_route_spec.component)
        ) {
            return {
                status: 422,
                type: 'application/json',
                data: {
                    status: FAILURE,
                    message: `ERROR: ui_route_spec.component not defined [${req.context.ui_route_spec}]`
                }
            }
        }

        if (! ('_type' in req.context.ui_route_spec.component)
            ||
            (
              req.context.ui_route_spec.component._type != 'react/element'
              && req.context.ui_route_spec.component._type != 'react/html'
            )
        ) {
            return {
                status: 422,
                type: 'application/json',
                data: {
                    status: FAILURE,
                    message: `ERROR: ui_route_spec.component._type must be [react/element] or [react/html], received [${req.context.ui_route_spec.component._type}]`
                }
            }
        }

        // import maps
        const importMaps = req.context.ui_spec.importMaps

        // process context
        const js_context = {
            variables: {},
            imports: {},
            states: {},
            forms: {},
            tables: {},
            parsed: {},
            appx: req.context
        }

        // ui_elem
        const ui_route_name = ('self/' + req.context.ui_route_name).replace(/\/+/g, '/')
        reg_js_variable(js_context, ui_route_name, 'const', capitalize(req.context.ui_route_name))
        js_context.self = ui_route_name

        reg_js_import(js_context, 'react', use_default=true, 'React')
        //reg_js_import(js_context, 'react-dom', true, 'ReactDOM')

        const input = req.context.ui_route_spec

        // create react component function
        const component_func = react_component(js_context, input)

        // handle test statements
        const test_statements = []
        if ('_test' in req.context.ui_route_spec) {
          // register variable
          const ui_test_name = ui_route_name + '.Test'
          reg_js_variable(js_context, ui_test_name)
          // process providers
          let test_component = {
            _type: 'react/element',
            name: ui_route_name,
          }
          if (!!req.context.ui_route_spec._test.providers) {
            req.context.ui_route_spec._test.providers
              .reverse()
              .filter(provider => provider._type === 'react/element')
              .map(provider => {
                test_component = {
                  _type: provider._type,
                  name: provider.name,
                  props: provider.props,
                  children: [
                    test_component
                  ]
                }
              }
            )
          }
          // const Test = () => {}
          const testDeclaration = t.variableDeclaration(
            'const',
            [
              t.variableDeclarator(
                t.identifier(ui_test_name),
                t.arrowFunctionExpression(
                  [],
                  t.blockStatement(
                    [
                      // TODO
                      t.returnStatement(
                        react_element(js_context, null, test_component)
                      )
                    ]
                  )
                )
              )
            ]
          )
          //t.addComment(variableDeclaration, 'leading', ' ' + key, true)
          t.addComment(testDeclaration, 'trailing', ' Test', true)
          test_statements.push(testDeclaration)
          // ComponentName.Test = Test
          const testAssignment = t.expressionStatement(
            t.assignmentExpression(
              '=',
              t.memberExpression(
                t.identifier(ui_route_name),
                t.identifier('Test')
              ),
              t.identifier(ui_test_name)
            )
          )
          //t.addComment(variableDeclaration, 'leading', ' ' + key, true)
          t.addComment(testAssignment, 'trailing', ' expose Test', true)
          test_statements.push(testAssignment)
        }

        // create ast tree for the program
        const ast_tree = t.file(
          t.program(
            [
              t.variableDeclaration(
                'const',
                [
                  t.variableDeclarator(
                    t.identifier(ui_route_name),
                    component_func,
                  )
                ]
              ),
              // include test code
              ...test_statements,
              // export
              t.exportDefaultDeclaration(
                t.identifier(ui_route_name)
              ),
            ],
            [], // program directives
            "module"
          )
        )

        // console.log(js_context)

        // resolve imports and variables in the ast_tree
        js_resolve_ids(js_context, ast_tree)

        // generate code
        const output = generate(ast_tree, {}, {})
        // console.log(output.code)

        const prettified = prettier.format(output.code, { semi: false, parser: "babel" })

        // res.status(200).type('application/javascript').send(prettified)
        return {
            status: 200,
            type: 'application/javascript',
            data: prettified,
        }

    } catch (err) {

        console.log(err)
        return {
            status: 500,
            type: 'application/json',
            data: String(err),
        }
    }
}

// export
module.exports = {
    handle_appx_route: handle_appx_route
}
