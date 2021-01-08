import React from 'react'
import {
  Icon,
  FileOutlined,
  FileTextOutlined,
  // ContainerOutlined,
  // CodepenOutlined,
  SwitcherOutlined,
  QuestionCircleOutlined,
  QuestionOutlined,
  FieldStringOutlined,
  NumberOutlined,
  // SmallDashOutlined,
  // SwapOutlined,
  FullscreenExitOutlined,
  FilterOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  // MenuOutlined,
  // ApartmentOutlined,
  PercentageOutlined,
  // ImportOutlined,
  // FunctionOutlined,
  // FontSizeOutlined,
  // DatabaseOutlined,
  // UngroupOutlined,
  // SisternodeOutlined,
  PoweroffOutlined,
  MinusCircleOutlined,
  FormatPainterOutlined,
  DoubleRightOutlined,
  BranchesOutlined,
  CompressOutlined,
  // AppstoreAddOutlined,
  MinusOutlined,
  StopOutlined,
  DashOutlined,
  HomeOutlined,
} from '@ant-design/icons'
//import {
  // FunctionOutlined as FunctionOutlinedIcon,
  // AllOutOutlined,
//} from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

import ReactIcon from 'app-x/icon/React'
// import Database from 'app-x/icon/Database'
import Html from 'app-x/icon/Html'
import Import from 'app-x/icon/Import'
import Text from 'app-x/icon/Text'
import Css from 'app-x/icon/Css'
import Bracket from 'app-x/icon/Bracket'
import CurlyBracket from 'app-x/icon/CurlyBracket'
import Calculator from 'app-x/icon/Calculator'
import Function from 'app-x/icon/Function'
import Code from 'app-x/icon/Code'
import Branch from 'app-x/icon/Branch'
import Route from 'app-x/icon/Route'
import Effect from 'app-x/icon/Effect'
import State from 'app-x/icon/State'
import Form from 'app-x/icon/Form'
import Context from 'app-x/icon/Context'
import InputText from 'app-x/icon/InputText'
import Filter from 'app-x/icon/Filter'
import API from 'app-x/icon/API'
import Style from 'app-x/icon/Style'
import Pointer from 'app-x/icon/Pointer'

const PATH_SEPARATOR = '/'
const VARIABLE_SEPARATOR = '.'


////////////////////////////////////////////////////////////////////////////////
// primitive test
function isPrimitive(test) {
    return (test !== Object(test))
}

// parse variable full path
function parse_var_full_path(var_full_path) {

  let import_paths = var_full_path.split(PATH_SEPARATOR)
  let sub_vars = import_paths[import_paths.length - 1].split(VARIABLE_SEPARATOR)

  // add first sub_var to import_path
  import_paths[import_paths.length - 1] = sub_vars.shift()

  return {
    full_paths: [].concat(import_paths, sub_vars),
    import_paths: import_paths,
    sub_vars: sub_vars
  }
}

////////////////////////////////////////////////////////////////////////////////

// lookup icon by type
function lookup_icon_for_type(type) {
  return lookup_icon_for_input({_type: type, data: ''})
}

// lookup icon for input (input._type)
function lookup_icon_for_input(input) {

  function _primitive_icon(data) {
    switch (typeof data) {
      case 'string':
        return <Text />
      case 'number':
        return <NumberOutlined />
      case 'boolean':
        return <PoweroffOutlined />
      case 'undefined':
        return <MinusCircleOutlined />
      case 'object':
        if (input === null) {
          return <MinusCircleOutlined />
        } else {
          throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
        }
      default:
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
    }
  }

  if (isPrimitive(input)) {
    return _primitive_icon(input)
  }

  if (Array.isArray(input)) {
    return <Bracket />
  }

  if (! ('_type' in input)) {
    return <CurlyBracket />
  }

  // '_type' is presented in the json object
  if (input._type === 'js/string') {

    return <Text />

  } else if (input._type === 'js/number') {

    return  <NumberOutlined />

  } else if (input._type === 'js/boolean') {

    return  <PoweroffOutlined />

  } else if (input._type === 'js/null') {

    return  <MinusCircleOutlined />

  } else if (input._type === 'js/array') {

    return  <Bracket />

  } else if (input._type === 'js/object') {

    return <CurlyBracket />

  } else if (input._type === 'js/import') {

    return <Import />

  } else if (input._type === 'js/expression') {

    return <PercentageOutlined />

  } else if (input._type === 'js/statement') {

    return <Code />

  } else if (input._type === 'js/function') {

    return <Function />

  } else if (input._type === 'js/switch') {

    return <Branch />

  } else if (input._type === 'js/map') {

    return <DoubleRightOutlined />

  } else if (input._type === 'js/reduce') {

    return <CompressOutlined />

  } else if (input._type === 'js/filter') {

    return <Filter />

  } else if (input._type === 'react/element') {

    return <ReactIcon />

  } else if (input._type === 'react/html') {

    return <Html />

  } else if (input._type === 'react/state') {

    return <State />

  } else if (input._type === 'react/context') {

    return <Context />

  } else if (input._type === 'react/effect') {

    return <Effect />

  } else if (input._type === 'react/form') {

    return <Form />

  } else if (input._type === 'input/text') {

    return <InputText />

  } else if (input._type === 'mui/style') {

    return <Style />

  } else if (input._type === 'appx/api') {

    return <API />

  } else if (input._type === 'appx/route') {

    return <Route />

  } else if (input._type === 'pointer') {

    return <Pointer />

  } else if (input._type === '/') {

    return <HomeOutlined />

  } else {

    return <QuestionOutlined />
  }
}

// lookup title for input (input._type / input.name / input.data ...)
function lookup_title_for_input(ref, input) {

  const prefix = ref ? ref + ': ' : ''

  function _primitive_title(data) {
    switch (typeof data) {
      case 'string':
        return prefix + (data.length > 32 ? data.substring(0, 30) + '...' : data)
      case 'number':
        return prefix + data.toString()
      case 'boolean':
        return prefix + data.toString()
      case 'undefined':
        return prefix + 'null'
      case 'object':
        if (data === null) {
          return prefix + 'null'
        } else {
          throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
        }
      default:
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
    }
  }

  if (isPrimitive(input)) {
    return _primitive_title(input)
  }

  if (Array.isArray(input)) {
    return ref ? ref : ''
  }

  if (! ('_type' in input)) {
    return ref ? ref : ''
  }

  // '_type' is presented in the json object
  if (input._type === 'js/string') {

    return _primitive_title(String(input.data))

  } else if (input._type === 'js/number') {

    return _primitive_title(isNaN(Number(input.data)) ? 0 : Number(input.data))

  } else if (input._type === 'js/boolean') {

    return _primitive_title(Boolean(input.data))

  } else if (input._type === 'js/null') {

    return _primitive_title(null)

  } else if (input._type === 'js/array') {

    return ref ? ref : ''

  } else if (input._type === 'js/object') {

    return ref ? ref : ''

  } else if (input._type === 'js/import') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input._type === 'js/expression') {

    return prefix + (input.data.length > 32 ? input.data.substring(0, 30) + '...' : input.data)

  } else if (input._type === 'js/statement') {

    return prefix + (input.data.length > 32 ? input.data.substring(0, 30) + '...' : input.data)

  } else if (input._type === 'js/function') {

    const name = 'func (' +
      (
        input.params
          ? input.params
            .map(param => isPrimitive(param) ? String(param) : String(param.value))
            .join(', ')
          : ''
      )
      +  ')'
    return prefix + (name.length > 32 ? name.substring(0, 30) + '...' : name)

  } else if (input._type === 'js/switch') {

    return prefix + 'Switch'

  } else if (input._type === 'js/map') {

    return prefix + 'Map'

  } else if (input._type === 'js/reduce') {

    return prefix + 'Reduce'

  } else if (input._type === 'js/filter') {

    return prefix + 'Filter'

  } else if (input._type === 'react/element') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input._type === 'react/html') {

    const parsed = parse_var_full_path(input.name)
    return prefix + parsed.full_paths.pop()

  } else if (input._type === 'react/state') {

    if (!!ref && ref.startsWith('...')) {
      return ref
    } else {
      return prefix + input.name
    }

  } else if (input._type === 'react/context') {

    return ref ? ref : ''

  } else if (input._type === 'react/effect') {

    const name = 'effect [' +
      (
        input.states
          ? input.states
            .map(state => isPrimitive(state) ? String(state) : String(state.value))
            .join(', ')
          : ''
      )
      +  ']'
    return prefix + (name.length > 32 ? name.substring(0, 30) + '...' : name)

  } else if (input._type === 'react/form') {

    return prefix + input.name

  } else if (input._type === 'input/text') {

    return prefix + `Input [${input.name}]`

  } else if (input._type === 'mui/style') {

    return ref ? ref : ''

  } else if (input._type === 'appx/api') {

    return prefix + 'API'

  } else if (input._type === 'appx/route') {

    return ref ? ref : ''

  } else {

    return ref ? ref : ''
  }
}

////////////////////////////////////////////////////////////////////////////////
// processors
/*

// create primitive tree node
function parse_js_primitive(js_context, parentKey, ref, input) {

  // console.log(`parse_js_primitive`, js_context, parentKey, ref, input)
  const prefix = ref ? ref + ': ' : ''

  // tree node data
  const data = {
    _ref: ref,
    _type: (input === null || typeof input === 'undefined') ? 'js/null' : ('js/' + typeof input),
    data: (input === null || typeof input === 'undefined') ? null : input,
  }

  switch (typeof input) {
    case 'string':
      return new_tree_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'number':
      return new_tree_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'boolean':
      return new_tree_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'undefined':                         // treat undefined as null
      return new_tree_node(
        lookup_title_for_input(ref, input),
        lookup_icon_for_input(input),
        data,
        parentKey,
        true)
    case 'object':
      if (input === null) {
        return new_tree_node(
          lookup_title_for_input(ref, input),
          lookup_icon_for_input(input),
          data,
          parentKey,
          true)
      } else {
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
      }
    default:
      throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
  }
}

// return array tree
function parse_js_array(js_context, parentKey, ref, input) {

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: false
    },
    __childrenWithoutRef: {
      enable: true
    },
    _type: 'js/array',
  }

  // empty input
  if (!input) {

    return new_tree_node(
      lookup_title_for_input(ref, {type: 'js/array'}),
      lookup_icon_for_input({type: 'js/array'}),
      data,
      parentKey,
      false)
  }

  // for non empty input
  if (isPrimitive(input)) {
    throw new Error(`ERROR: input is primitive [${JSON.stringify(input)}]`)
  }

  if (typeof input !== 'object') {
    throw new Error(`ERROR: input is not object [${typeof input}] [${JSON.stringify(input)}]`)
  }

  if (!Array.isArray(input)) {
    throw new Error(`ERROR: input is not array [${typeof input}] [${JSON.stringify(input)}]`)
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand array by default
  // js_context.expandedKeys.push(node.key)

  if (js_context.topLevel) {

    input.map(item => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          null,
          null,
          item
        )
      )
    })

    // return node with children
    return node

  } else {
    node.children = input.map(item => {
      return parse_js(
        js_context,
        node.key,
        null,
        item
      )
    })

    return node
  }
}

// create object tree
function parse_js_object(js_context, parentKey, ref, input) {

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true
    },
    __childrenWithoutRef: {
      enable: false
    },
    _type: 'js/object',
  }

  // empty input
  if (!input) {

    return new_tree_node(
      lookup_title_for_input(ref, {type: 'js/object'}),
      lookup_icon_for_input({type: 'js/object'}),
      data,
      parentKey,
      false)
  }

  // for non empty input
  if (isPrimitive(input)) {
    throw new Error(`ERROR: input is primitive [${JSON.stringify(input)}]`)
  }

  if (typeof input !== 'object') {
    throw new Error(`ERROR: input is not object [${typeof input}] [${JSON.stringify(input)}]`)
  }

  if (Array.isArray(input)) {
    throw new Error(`ERROR: input is array [${typeof input}] [${JSON.stringify(input)}]`)
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand object by default
  // js_context.expandedKeys.push(node.key)

  if (js_context.topLevel) {
    // return children only
    const results = []
    Object.keys(input).map(key => {
      // skip keys starts with '__'
      if (key.startsWith('__')) {
        return
      }
      // add children to node
      results.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          null,
          key,
          input[key]
        )
      )
    })

    // add root element to the top level
    results.unshift(new_root_node())

    return results
  } else {
    // return node with children
    Object.keys(input).map(key => {
      // skip keys starts with '__'
      if (key.startsWith('__')) {
        return
      }
      // add children to node
      node.children.push(
        parse_js(
          js_context,
          node.key,
          key,
          input[key]
        )
      )
    })

    // reorder
    reorder_children(node)

    return node
  }
}

// create import tree node
function parse_js_import(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/import') {
    throw new Error(`ERROR: input._type is not [js/import] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [js/import] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    name: input.name,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create expression tree node
function parse_js_expression(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/expression') {
    throw new Error(`ERROR: input._type is not [js/expression] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/expression] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    data: input.data,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create block tree node (allow return outside of function)
function parse_js_statement(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/statement') {
    throw new Error(`ERROR: input._type is not [js/statement] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [js/statement] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    body: input.body,
  }

  // compute title
  const title = lookup_title_for_input(ref, input)

  const node = new_tree_node(title, lookup_icon_for_input(input), data, parentKey, true)

  return node
}

// create array function tree node
function parse_js_function(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/function') {
    throw new Error(`ERROR: input._type is not [js/function] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('body' in input)) {
    throw new Error(`ERROR: input.body missing in [js/function] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    params: input.params,
    body: input.body,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create switch tree node
function parse_js_switch(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/switch') {
    throw new Error(`ERROR: input._type is not [js/switch] [${input._type}] [${JSON.stringify(input)}]`)
  }

  //if (! ('children' in input)) {
  //  throw new Error(`ERROR: input.children missing in [js/switch] [${JSON.stringify(input)}]`)
  //}
  //
  //if (! Array.isArray(input.children)) {
  //  throw new Error(`ERROR: input.children is not Array [${JSON.stringify(input)}]`)
  //}

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'default' ],
    },
    __childrenWithoutRef: {
      enable: true,
      extraProps: [ 'condition' ],
    },
    _type: input._type,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand switch by default
  js_context.expandedKeys.push(node.key)

  // add each conditions and results
  if (!!input.children && Array.isArray(input.children)) {
    input.children.map(child => {

      if (! ('condition' in child)) {
        throw new Error(`ERROR: [js/switch] child missing [condition] [${JSON.stringify(child)}]`)
      }
      if (! ('result' in child)) {
        throw new Error(`ERROR: [js/switch] child missing [result] [${JSON.stringify(child)}]`)
      }

      // process result as child node
      const childNode = parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        null,
        child.result
      )
      // add condition data to childNode
      childNode.data.condition = child.condition

      node.children.push(childNode)
    })
  }

  // add default if exist
  if (input.default) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'default',
        input.default ? input.default : null
      )
    )
  }

  // reorder
  reorder_children(node)

  return node
}

// create js map tree node
function parse_js_map(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/map') {
    throw new Error(`ERROR: input._type is not [js/map] [${input._type}] [${JSON.stringify(input)}]`)
  }

  //if (! ('data' in input)) {
  //  throw new Error(`ERROR: input.data missing in [js/map] [${JSON.stringify(input)}]`)
  //}

  //if (! ('result' in input)) {
  //  throw new Error(`ERROR: input.result missing in [js/map] [${JSON.stringify(input)}]`)
  //}

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data', 'result' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    _type: input._type,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand map by default
  js_context.expandedKeys.push(node.key)

  // add 'data' if exist
  if (input.data) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'data',
        input.data ? input.data : null
      )
    )
  }

  // add 'result' if exist
  if (input.result) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'result',
        input.result ? input.result : null
      )
    )
  }

  // reorder
  reorder_children(node)

  return node
}

// create js reduce tree node
function parse_js_reduce(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/reduce') {
    throw new Error(`ERROR: input._type is not [js/reduce] [${input._type}] [${JSON.stringify(input)}]`)
  }

  //if (! ('data' in input)) {
  //  throw new Error(`ERROR: input.data missing in [js/reduce] [${JSON.stringify(input)}]`)
  //}

  if (! ('reducer' in input)) {
    throw new Error(`ERROR: input.reducer missing in [js/reduce] [${JSON.stringify(input)}]`)
  }

  //if (! ('init' in input)) {
  //  throw new Error(`ERROR: input.init missing in [js/reduce] [${JSON.stringify(input)}]`)
  //}

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data', 'init' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    _type: input._type,
    reducer: input.reducer,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // input reducer
  node.data.reducer = input.reducer

  // input init
  node.data.init = input.init

  // expand reduce by default
  js_context.expandedKeys.push(node.key)

  // add 'data' if exist
  if (input.data) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'data',
        input.data ? input.data : null
      )
    )
  }

  // reorder
  reorder_children(node)

  return node
}

// create js filter tree node
function parse_js_filter(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'js/filter') {
    throw new Error(`ERROR: input._type is not [js/filter] [${input._type}] [${JSON.stringify(input)}]`)
  }

  //if (! ('data' in input)) {
  //  throw new Error(`ERROR: input.data missing in [js/filter] [${JSON.stringify(input)}]`)
  //}

  if (! ('filter' in input)) {
    throw new Error(`ERROR: input.filter missing in [js/filter] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'data' ],
    },
    __childrenWithoutRef: {
      enable: false,
    },
    _type: input._type,
    filter: input.filter,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // input filter
  node.data.filter = input.filter

  // expand filter by default
  js_context.expandedKeys.push(node.key)

  // add 'data' if exist
  if (input.data) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'data',
        input.data ? input.data : null
      )
    )
  }

  // reorder
  reorder_children(node)

  return node
}

// create react element tree node
function parse_react_element(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/element') {
    throw new Error(`ERROR: input._type is not [react/element] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/element] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'props' ],
    },
    __childrenWithoutRef: {
      enable: true,
    },
    _type: input._type,
    name: input.name,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand react element by default
  js_context.expandedKeys.push(node.key)

  // add input.props if exist
  if (input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.children
  if ('children' in input && input.children) {
    if (!Array.isArray(input.children)) {
      throw new Error(`ERROR: input.children is not Array [${typeof input.children}]`)
    }

    input.children.map(child => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          node.key,
          null,
          child
        )
      )
    })
  }

  // reorder
  reorder_children(node)

  return node
}

// create jsx html element ast
function parse_react_html(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/html') {
    throw new Error(`ERROR: input._type is not [react/html] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/html] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
      validRefs: [ 'props' ],
    },
    __childrenWithoutRef: {
      enable: true,
    },
    _type: input._type,
    name: input.name,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand react html by default
  js_context.expandedKeys.push(node.key)

  // add input.props if exist
  if (input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.children
  if ('children' in input && input.children) {
    if (!Array.isArray(input.children)) {
      throw new Error(`ERROR: input.children is not Array [${typeof input.children}]`)
    }

    input.children.map(child => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          node.key,
          null,
          child
        )
      )
    })
  }

  // reorder
  reorder_children(node)

  return node
}

// create react state ast
function parse_react_state(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/state') {
    throw new Error(`ERROR: input._type is not [react/state] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/state] [${JSON.stringify(input)}]`)
  }

  if (! ('setter' in input)) {
    throw new Error(`ERROR: input.setter missing in [react/state] [${JSON.stringify(input)}]`)
  }

  if (! ('init' in input)) {
    throw new Error(`ERROR: input.init missing in [react/state] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    name: input.name,
    setter: input.setter,
    init: input.init,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create react context ast
function parse_react_context(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/context') {
    throw new Error(`ERROR: input._type is not [react/context] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [react/context] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    name: input.name,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create react effect block ast (do not allow return outside of function)
function parse_react_effect(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/effect') {
    throw new Error(`ERROR: input._type is not [react/effect] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('data' in input)) {
    throw new Error(`ERROR: input.data missing in [react/effect] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    data: input.data,
    states: input.states,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    true)

  return node
}

// create react form ast
function parse_react_form(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'react/form') {
    throw new Error(`ERROR: input._type is not [react/form] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (!input.name) {
    throw new Error(`ERROR: input.name not set in [react/form] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    name: input.name,
    onSubmit: input.onSubmit,
    onError: input.onError
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // expand react html by default
  js_context.expandedKeys.push(node.key)

  // add input.props if exist
  if (!!input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.formProps if exist
  if (!!input.formProps) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'formProps',
        input.formProps
      )
    )
  }

  // add input.children
  if (!!input.children) {
    if (!Array.isArray(input.children)) {
      throw new Error(`ERROR: input.children is not Array [${typeof input.children}]`)
    }

    input.children.map(child => {
      node.children.push(
        parse_js(
          {
            ...js_context,
            topLevel: false,
          },
          node.key,
          null,
          child
        )
      )
    })
  }

  // reorder
  reorder_children(node)

  return node
}

// create react form ast
function parse_input_text(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'input/text') {
    throw new Error(`ERROR: input._type is not [input/text] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('name' in input)) {
    throw new Error(`ERROR: input.name missing in [input/text] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    name: input.name,
    array: input.array,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // add input.props if exist
  if (!!input.props) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'props',
        input.props
      )
    )
  }

  // add input.rules if exist
  if (!!input.rules) {
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        'rules',
        input.rules
      )
    )
  }

  return node
}

// create mui style expression
function parse_mui_style(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'mui/style') {
    throw new Error(`ERROR: input._type is not [mui/style] [${input._type}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    __childrenWithRef: {
      enable: true,
    },
    __childrenWithoutRef: {
      enable: false,
    },
    _type: input._type,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data,
    parentKey,
    false)

  // do not expand mui styles by default
  // js_context.expandedKeys.push(node.key)

  // add all styles children
  Object.keys(input).map(key => {
    if (key == '_type') {
      return
    }
    node.children.push(
      parse_js(
        {
          ...js_context,
          topLevel: false,
        },
        node.key,
        key,
        input[key]
      )
    )
  })

  // reorder
  reorder_children(node)

  return node
}

// create appx api ast
function parse_appx_api(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'appx/api') {
    throw new Error(`ERROR: input._type is not [appx/api] [${input._type}] [${JSON.stringify(input)}]`)
  }

  if (! ('namespace' in input)) {
    throw new Error(`ERROR: input.namespace missing in [appx/api] [${JSON.stringify(input)}]`)
  }

  if (! ('app_name' in input)) {
    throw new Error(`ERROR: input.app_name missing in [appx/api] [${JSON.stringify(input)}]`)
  }

  if (! ('method' in input)) {
    throw new Error(`ERROR: input.method missing in [appx/api] [${JSON.stringify(input)}]`)
  }

  if (! ('endpoint' in input)) {
    throw new Error(`ERROR: input.endpoint missing in [appx/api] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
    namespace: input.namespace,
    app_name: input.app_name,
    method: input.method,
    endpoint: input.endpoint,
    data: input.data,
    pref: input.prep,
    result: input.result,
    error: input.error
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data, parentKey,
    true)

  return node
}

// create appx route ast
function parse_appx_route(js_context, parentKey, ref, input) {

  if (!('_type' in input) || input._type !== 'appx/route') {
    throw new Error(`ERROR: input._type is not [appx/route] [${input._type}] [${JSON.stringify(input)}]`)
  }

  // tree node data
  const data = {
    _ref: ref,
    _type: input._type,
  }

  const node = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    data, parentKey,
    true)

  return node
}

////////////////////////////////////////////////////////////////////////////////

// process input data and return tree data
function parse_js(js_context, parentKey, ref, input) {

  if (! ('expandedKeys' in js_context)) {
    js_context.expandedKeys = []
  }

  if (isPrimitive(input)) {
    return parse_js_primitive(js_context, parentKey, ref, input)
  }

  if (Array.isArray(input)) {
    return parse_js_array(js_context, parentKey, ref, input)
  }

  if (! ('_type' in input)) {
    // no '_type' is treated as json object
    return parse_js_object(js_context, parentKey, ref, input)
  }

  // '_type' is presented in the json object
  if (input._type === 'js/string' || input._type === 'js/number' || input._type === 'js/boolean' || input._type === 'js/null') {

    return parse_js_primitive(js_context, parentKey, ref, input.data)

  } else if (input._type === 'js/object') {

    return parse_js_object(js_context, parentKey, ref, input.data)

  } else if (input._type === 'js/array') {

    return parse_js_array(js_context, parentKey, ref, input.data)

  } else if (input._type === 'js/import') {

    return parse_js_import(js_context, parentKey, ref, input)

  } else if (input._type === 'js/expression') {

    return parse_js_expression(js_context, parentKey, ref, input)

  } else if (input._type === 'js/statement') {

    return parse_js_statement(js_context, parentKey, ref, input)

  } else if (input._type === 'js/function') {

    return parse_js_function(js_context, parentKey, ref, input)

  } else if (input._type === 'js/switch') {

    return parse_js_switch(js_context, parentKey, ref, input)

  } else if (input._type === 'js/map') {

    return parse_js_map(js_context, parentKey, ref, input)

  } else if (input._type === 'js/reduce') {

    return parse_js_reduce(js_context, parentKey, ref, input)

  } else if (input._type === 'js/filter') {

    return parse_js_filter(js_context, parentKey, ref, input)

  } else if (input._type === 'react/element') {

    return parse_react_element(js_context, parentKey, ref, input)

  } else if (input._type === 'react/html') {

    return parse_react_html(js_context, parentKey, ref, input)

  } else if (input._type === 'react/state') {

    return parse_react_state(js_context, parentKey, ref, input)

  } else if (input._type === 'react/context') {

    return parse_react_context(js_context, parentKey, ref, input)

  } else if (input._type === 'react/effect') {

    return parse_react_effect(js_context, parentKey, ref, input)

  } else if (input._type === 'react/form') {

    return parse_react_form(js_context, parentKey, ref, input)

  } else if (input._type === 'input/text') {

    return parse_input_text(js_context, parentKey, ref, input)

  } else if (input._type === 'mui/style') {

    return parse_mui_style(js_context, parentKey, ref, input)

  } else if (input._type === 'appx/api') {

    return parse_appx_api(js_context, parentKey, ref, input)

  } else if (input._type === 'appx/route') {

    return parse_appx_route(js_context, parentKey, ref, input)

  } else {

    throw new Error(`ERROR: unrecognized input._type [${input._type}] [${JSON.stringify(input)}]`)
  }
}
*/

////////////////////////////////////////////////////////////////////////////////
// api methods
const api_methods = [
  'get',
  'post',
  'put',
  'delete',
  'head',
  'patch',
]

// return a list of valid html tags
function valid_api_methods() {
  return api_methods
}

// https://html.spec.whatwg.org/#elements-3
const html_tags = [
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'menu',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'slot',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'template',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr'
]

// return a list of valid html tags
function valid_html_tags() {
  return html_tags.sort()
}

// stores a list of valid import_names
const _valid_import_data = {}
const _valid_import_names = []

// load valid import names
function load_valid_import_data() {

  if (!globalThis.appx?.IMPORT_MAPS) {
    throw new Error(`ERROR: appx.IMPORT_MAPS not set`)
  }

  const libs = globalThis.appx?.IMPORT_MAPS.libs
  if (libs) {
    // iterate libs
    Object.keys(libs).map(lib_key => {
      const path = libs[lib_key].path
      // import lib path
      import(path).then(path_module => {
        // load module
        const modules = libs[lib_key].modules
        if (modules && modules.length) {
          // iterate modules
          modules.map(module_name => {
            // console.log(module_name)
            const module_content = path_module['default'][module_name]
            if (typeof module_content === 'object' && module_content) {
              // console.log(module_content)
              Object.keys(module_content).map(variable_name => {
                if (variable_name === 'default') {
                  // add default
                  _valid_import_data[module_name] = {
                    title: module_name,
                    module: module_name,
                    variable: variable_name,
                  }
                }
                const title = module_name + VARIABLE_SEPARATOR + variable_name
                _valid_import_data[title] = {
                  title: title,
                  module: module_name,
                  variable: variable_name,
                }
              })
            }
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
    })
  }

  // load appx
  if (!!globalThis.appx?.APPX_PATHS?.paths) {
    globalThis.appx.APPX_PATHS.paths.map(path => {
      // import lib path
      // console.log(path)
      import(PATH_SEPARATOR + path)
      .then(path_module => {
        // console.log(path_module)
        const module_name = path
        Object.keys(path_module).map(variable_name => {
          if (variable_name === 'default') {
            // add default
            _valid_import_data[module_name] = {
              title: module_name,
              module: module_name,
              variable: variable_name,
            }
          }
          const title = module_name + VARIABLE_SEPARATOR + variable_name
          _valid_import_data[title] = {
            title: title,
            module: module_name,
            variable: variable_name,
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
    })
  }

}

load_valid_import_data()

// return a list of valid import names
function valid_import_names() {
  // if import data is not initialized
  if (!_valid_import_names.length) {
    Object.keys(_valid_import_data).sort().map(key => {
      _valid_import_names.push(key)
    })
    console.log(`valid_import_names`, _valid_import_names.length)
  }
  return _valid_import_names
}

// valid child _types
function lookup_valid_child_types(type) {
  if (!type || type === '/') {
    return {
      'ref': {
        names: null,
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          'react/state',
          'react/context',
          'react/effect',
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          'js/statement',
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          null,
          'mui/style',
          'appx/api',
          'appx/route',
        ]
      }
    }
  } else if (type === 'js/string') {
    return null         // leaf
  } else if (type === 'js/number') {
    return null         // leaf
  } else if (type === 'js/boolean') {
    return null         // leaf
  } else if (type === 'js/null') {
    return null         // leaf
  } else if (type === 'js/object') {
    return {
      'ref': {
        names: null,
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          'react/state',
          'react/context',
          // 'react/effect',  // effect code not allowed
          // null,
          // 'react/form',    // react/form not allowed
          // 'input/text',    // input/text not allowed
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui/style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'js/array') {
    return {
      '_': {
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          'react/state',
          'react/context',
          // 'react/effect',  // effect code not allowed
          // null,
          // 'react/form',    // react/form not allowed
          // 'input/text',    // input/text not allowed
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'js/import') {
    return null         // leaf
  } else if (type === 'js/expression') {
    return null         // leaf
  } else if (type === 'js/function') {
    return null         // leaf
  } else if (type === 'js/statement') {
    return null         // leaf
  } else if (type === 'js/switch') {
    return {
      ref: {
        names: [
          'default'
        ],
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      },
      '_': {
        attrs: [
          'condition'
        ],
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'js/map') {
    return {
      ref: {
        names: [
          'data',
          'result',
        ],
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'js/reduce') {
    return {
      ref: {
        names: [
          'data',
        ],
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'js/filter') {
    return {
      ref: {
        names: [
          'data',
        ],
        _types: [
          'js/string',
          'js/number',
          'js/boolean',
          'js/null',
          null,
          'js/object',
          'js/array',
          null,
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // null,
          // 'mui/style',     // mui style not allowed
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',    // appx/route not allowed
        ]
      }
    }
  } else if (type === 'react/element') {
    return {
      ref: {
        names: [
          'props',
        ],
        _types: [
          'js/object',
        ]
      },
      '_': {
        _types: [
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/string',
          // 'js/number',
          // 'js/boolean',
          // 'js/null',
          // null,
          // 'js/object',
          // 'js/array',
          // null,
          // 'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // 'mui/style',
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',
        ]
      }
    }
  } else if (type === 'react/html') {
    return {
      ref: {
        names: [
          'props',
        ],
        _types: [
          'js/object',
        ]
      },
      '_': {
        _types: [
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          'react/form',
          'input/text',
          null,
          'js/string',
          // 'js/number',
          // 'js/boolean',
          // 'js/null',
          // null,
          // 'js/object',
          // 'js/array',
          // null,
          // 'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // 'mui/style',
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',
        ]
      }
    }
  } else if (type === 'react/form') {
    return {
      ref: {
        names: [
          'props',
          'formProps',
        ],
        _types: [
          'js/object',
        ]
      },
      '_': {
        _types: [
          'react/element',
          'react/html',
          // 'react/state',   // state code not allowed
          // 'react/context', // context code not allowed
          // 'react/effect',  // effect code not allowed
          null,
          // 'react/form',    // nested form not allowed
          'input/text',
          null,
          'js/string',
          // 'js/number',
          // 'js/boolean',
          // 'js/null',
          // null,
          // 'js/object',
          // 'js/array',
          // null,
          // 'js/import',
          'js/expression',
          'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // 'mui/style',
          // 'appx/api'       // appx/api not allowed
          // 'appx/route',
        ]
      }
    }
  } else if (type === 'react/state') {
    return null         // leaf
  } else if (type === 'react/context') {
    return null         // leaf
  } else if (type === 'react/effect') {
    return null         // leaf
  } else if (type === 'input/text') {
    return {
      ref: {
        names: [
          'props',
          'rules',
        ],
        _types: [
          'js/object',
        ]
      }
    }
  } else if (type === 'mui/style') {
    return {
      ref: {
        names: null,
        _types: [
          // 'js/string',
          // 'js/number',
          // 'js/boolean',
          // 'js/null',
          'js/object',
          // 'js/array',
          // null,
          // 'js/import',
          'js/expression',
          // 'js/function',
          // 'js/statement',  // code block not allowed
          null,
          'js/switch',
          'js/map',
          'js/reduce',
          'js/filter',
          // 'react/element',
          // 'react/html',
          // 'react/state',
          // 'react/context',
          // 'react/effect',
          // null,
          // 'react/form',
          // 'input/text',
          // 'mui/style',
          // 'appx/api',
          // 'appx/route',
        ]
      }
    }
  } else if (type === 'appx/api') {
    return null         // leaf
  } else if (type === 'appx/route') {
    return null         // leaf
  } else {
    return null         // leaf
  }
}

function lookup_classname_by_type(type) {
  const classname =
    (!type || type === '/')
    ? 'appx-type-root'
    : 'appx-type-' + type.replace(/[^a-zA-Z0-9]/g, '-')
  // console.log(classname)
  return classname
}

// lookup type by classname
function lookup_type_by_classname(className) {
  // handle root
  if (className.includes('appx-type-root')) {
    return '/'
  }
  // search others
  let found = null
  lookup_valid_child_types('/').ref._types.forEach(type => {
    if (!type || found) {
      return
    }
    if (className.includes(lookup_classname_by_type(type))) {
      found = type
      return
    }
  })
  return found
}

// reorder children
const reorder_children = (parentNode) => {

  if (parentNode.data._type === 'js/object'
      || parentNode.data._type === 'mui/style') {

    const children = []
    // add _ref !== null
    parentNode.children
      .filter(child => !!child.data._ref)
      .sort((a, b) => {
        return a.data._ref.localeCompare(b.data._ref)
      })
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  } else if (parentNode.data._type === 'react/element'
            || parentNode.data._type === 'react/html'
            || parentNode.data._type === 'react/form') {

    const children = []
    // add _ref === 'props'
    parentNode.children
      .filter(child => child.data._ref === 'props')
      .map(child => {
        children.push(child)
      })
    // add _ref === 'props'
    parentNode.children
      .filter(child => child.data._ref === 'formProps')
      .map(child => {
        children.push(child)
      })
    // add _ref === null
    parentNode.children
      .filter(child => child.data._ref === null)
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  } else if (parentNode.data._type === 'js/switch') {

    const children = []
    // add _ref === null
    parentNode.children
      .filter(child => child.data._ref === null)
      .map(child => {
        children.push(child)
      })
    // add _ref === 'default'
    parentNode.children
      .filter(child => child.data._ref === 'default')
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  } else if (parentNode.data._type === 'js/map') {

    const children = []
    // add _ref === 'data'
    parentNode.children
      .filter(child => child.data._ref === 'data')
      .map(child => {
        children.push(child)
      })
    // add _ref === 'result'
    parentNode.children
      .filter(child => child.data._ref === 'result')
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  } else if (parentNode.data._type === 'js/reduce') {

    const children = []
    // add _ref === 'data'
    parentNode.children
      .filter(child => child.data._ref === 'data')
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  } else if (parentNode.data._type === 'js/filter') {

    const children = []
    // add _ref === 'data'
    parentNode.children
      .filter(child => child.data._ref === 'data')
      .map(child => {
        children.push(child)
      })
    // update children
    parentNode.children = children

  }
}

////////////////////////////////////////////////////////////////////////////////
// generate tree node

////////////////////////////////////////////////////////////////////////////////
// create new node
function new_tree_node(title, icon, data, parentKey, isLeaf) {
  return {
    key: uuidv4(),
    parentKey: parentKey,
    title: title ? title : (data ? (data._ref ? data._ref : '') : ''),
    data: data ? data : null,
    icon: icon ? icon : <QuestionOutlined />,
    isLeaf: isLeaf ? true : false,
    children: isLeaf ? [] : [],
  }
}

// create new root node
function new_root_node() {
  return {
    key: '/',
    parentKey: null,
    title: '/',
    data: {
      _ref: null,
      _type: '/'
    },
    icon: lookup_icon_for_type('/'),
    isLeaf: true,
    children: null,
  }
}

// process input data and return tree data
// function parse_js(js_context, parentKey, ref, input) {
function generate_tree_node(js_context, parentKey, ref, input) {

  // add expandedKeys if not exist
  if (! ('expandedKeys' in js_context)) {
    js_context.expandedKeys = []
  }

  if (isPrimitive(input)) {
    switch (typeof input) {
      case 'string':
        return generate_tree_node(js_context, parentKey, ref, {_type: 'js/string', data: input})
      case 'number':
        return generate_tree_node(js_context, parentKey, ref, {_type: 'js/number', data: input})
      case 'boolean':
        return generate_tree_node(js_context, parentKey, ref, {_type: 'js/boolean', data: input})
      case 'undefined':                         // treat undefined as null
        return generate_tree_node(js_context, parentKey, ref, {_type: 'js/null'})
      case 'object':
        if (input === null) {
          return generate_tree_node(js_context, parentKey, ref, {_type: 'js/null'})
        } else {
          throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
        }
      default:
        throw new Error(`ERROR: input is not primitive [${typeof input}] [${JSON.stringify(input)}]`)
    }
  }

  // we are here if not primitive

  // if array
  if (Array.isArray(input)) {
    return generate_tree_node(
      js_context,
      parentKey,
      ref,
      {
        _type: 'js/array',
        children: input
      }
    )
  }

  // js/object
  if (!input._type) {
    return generate_tree_node(
      js_context,
      parentKey,
      ref,
      {
        _type: 'js/object',
        ...input
      }
    )
  }

  // handle topLevel
  if (js_context.topLevel) {
    // return children only
    const results = []
    Object.keys(input).map(key => {
      // skip keys starts with '__'
      if (key.startsWith('_')) {
        return
      }
      // add children to node
      results.push(
        generate_tree_node(
          {
            ...js_context,
            topLevel: false,
          },
          null,
          key,
          input[key]
        )
      )
    })

    // add root element to the top level
    results.unshift(new_root_node())

    return results
  }

  // input type
  if (! (input._type in globalThis.appx?.SPEC?.types)) {
    throw new Error(`ERROR: unrecognized input type [${input._type}] [${JSON.stringify(input)}]`)
  }

  const classes = globalThis.appx.SPEC.classes

  const spec = globalThis.appx.SPEC.types[input._type]

  // create current node as thisNode
  const thisNode = new_tree_node(
    lookup_title_for_input(ref, input),
    lookup_icon_for_input(input),
    {
      _ref: ref,
      _type: input._type,
      // empty data
    },
    parentKey,
    !(
      !!spec.children
      && spec.children.length
      && spec.children
        .map(child => '_childNode' in child)
        .reduce((accumulator, item) => accumulator || item, false)
    )
  )
  // set default expand
  if (!!spec._expand) {
    js_context.expandedKeys.push(thisNode.key)
  }

  // setup context variable
  const thisData = input

  // process children (not including '*')
  spec.children.map((childSpec) => {

    function _process_child(_ref, data) {

      // ignore _type
      if (_ref === '_type') {
        return
      }

      // check if exist
      if (! (_ref in input)) {
        if (!!childSpec.optional) {
          return // continue
        } else {
          throw new Error(`ERROR:  [${input._type}] missing [${childSpec.name}] [${JSON.stringify(input)}]`)
        }
      }

      // add to thisNode.data if _thisNode is defined
      if (!!childSpec._thisNode) {

        if (!!childSpec._thisNode.condition && ! eval(childSpec._thisNode.condition)) {
          // condition evaluated to false
          // ignore and continue
        } else {
          // add to current node
          if (!!childSpec._thisNode.generate) {
            thisNode.data[_ref] = eval(childSpec._thisNode.generate)
          } else if (!!childSpec._thisNode.array) {
            throw new Error(`ERROR: this node array input missing generate method [${JSON.stringify(childSpec._thisNode)}]`)
          } else if (childSpec._thisNode.input === 'js/string') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.data
          } else if (childSpec._thisNode.input === 'js/number') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.data
          } else if (childSpec._thisNode.input === 'js/boolean') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.data
          } else if (childSpec._thisNode.input === 'js/null') {
            // thisNode.data[_ref] = isPrimitive(data) ? data: data.data
          } else if (childSpec._thisNode.input === 'js/expression') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.data
          } else if (childSpec._thisNode.input === 'js/import') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.name
          } else if (childSpec._thisNode.input === 'js/statement') {
            thisNode.data[_ref] = isPrimitive(data) ? data : data.body
          } else {
            throw new Error(`ERROR: this node input type [${childSpec._thisNode.input}] missing generate method [${JSON.stringify(childSpec._thisNode)}]`)
          }
        }
      }

      // add to thisNode.children if _childNode is defined
      if (!!childSpec._childNode) {

        if (!!childSpec._childNode.condition && ! eval(childSpec._childNode.condition)) {
          // condition evaluated to false
          // ignore and continue
        } else {
          // create child node
          if (!!childSpec._childNode.array) {
            // generate function
            const generate = (data) => {
              return generate_tree_node(js_context, thisNode.key, null, data)
            }
            // check generate definition
            if (!!childSpec._childNode.generate) {
              // console.log(childSpec._childNode.generate)
              const children = eval(childSpec._childNode.generate)
              // console.log(children)
              children.map(childNode => thisNode.children.push(childNode))
            } else {
              throw new Error(`ERROR: child node array missing generate method [${JSON.stringify(childSpec._childNode)}]`)
            }

          } else {
            // generate function
            const generate = (data) => {
              return generate_tree_node(js_context, thisNode.key, _ref, data)
            }
            // check generate definition
            if (!!childSpec._childNode.generate) {
              // generate child node
              const child = eval(childSpec._childNode.generate)
              thisNode.children.push(child)
            } else {
              const childNode = generate_tree_node(js_context, thisNode.key, _ref, data)
              thisNode.children.push(childNode)
            }
          }
        }
      }
    }

    if (childSpec.name === '*') {

      Object.keys(input).map(key => {

        const _ref = key
        const data = input[_ref]

        try {
          _process_child(_ref, data)
        } catch (err) {
          console.error(err)
          throw err
        }
      })

    } else {

      const _ref = childSpec.name
      const data = input[_ref]

      try {
        _process_child(_ref, data)
      } catch (err) {
        console.error(err)
        throw err
      }
    }

  })

  return thisNode
}

// function new_tree_node(title, icon, data, parentKey, isLeaf)


export {
  // parse_js,
  generate_tree_node,
  // parse_js_object,
  // parse_js_primitive,
  // parse_js_expression,
  // parse_js_import,
  lookup_icon_for_type,
  lookup_icon_for_input,
  lookup_title_for_input,
  lookup_valid_child_types,
  lookup_classname_by_type,
  lookup_type_by_classname,
  valid_api_methods,
  valid_import_names,
  valid_html_tags,
  reorder_children,
  isPrimitive,
}