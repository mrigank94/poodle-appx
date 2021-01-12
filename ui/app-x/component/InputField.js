import React, { useState, useEffect, useContext } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
  FormControl,
  Input,
  InputLabel,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  TextField,
  Switch,
  makeStyles,
} from '@material-ui/core'
import {
  AddCircleOutline,
  RemoveCircleOutline,
  DeleteOutlineOutlined,
} from '@material-ui/icons'
import {
  useForm,
  useFormContext,
  useFieldArray,
  FormProvider,
  Controller,
} from "react-hook-form";
import { parse, parseExpression } from "@babel/parser"

import AutoComplete from 'app-x/component/AutoComplete'
import ControlledEditor from 'app-x/component/ControlledEditor'

// input field array
const InputField = ((props) => {
  // styles
  const styles = makeStyles((theme) => ({
    formControl: {
      width: '100%',
      padding: theme.spacing(2, 0),
    },
    labelControl: {
      width: '100%',
      padding: theme.spacing(2, 0, 0),
    },
    editor: {
      width: '100%',
      height: theme.spacing(8),
      padding: theme.spacing(0),
    },
    dummyTextField: {
      width: '100%',
      padding: theme.spacing(0, 0),
    },
  }))()

  // console.log(`useFormContext`, useFormContext())
  // useFormContext
  const {
    register,
    unregister,
    errors,
    watch,
    handleSubmit,
    reset,
    setError,
    clearErrors,
    setValue,
    getValues,
    trigger,
    control,
    formState,
  } = useFormContext()

  // destruct props
  const { name, childSpec } = props

  // return
  return (
    <Controller
      name={name}
      control={control}
      key={name}
      defaultValue=''
      rules={(() => {
        let count = 0
        const result = { validate: {} }
        // check optional flag
        if (!childSpec.optional && childSpec._thisNode?.input !== 'input/switch') {
          result['required'] = `${childSpec.desc} is required`
        }
        // check rules
        if (!!childSpec.rules) {
          childSpec.rules.map(rule => {
            if (rule.kind === 'required') {
              result['required'] = rule.message
            } else if (rule.kind === 'pattern') {
              result['pattern'] = {
                value: rule.pattern,
                message: rule.message,
              }
            } else if (rule.kind === 'validate') {
              result.validate[`validate_${count++}`] = (value) => (
                !!eval(rule.validate) || rule.message
              )
            }
          })
        }
        // check _thisNode.rules
        if (!!childSpec._thisNode?.rules) {
          childSpec._thisNode.rules.map(rule => {
            if (rule.kind === 'required') {
              result['required'] = rule.message
            } else if (rule.kind === 'pattern') {
              result['pattern'] = {
                value: rule.pattern,
                message: rule.message,
              }
            } else if (rule.kind === 'validate') {
              result.validate[`validate_${count++}`] = (value) => (
                !!eval(rule.validate) || rule.message
              )
            }
          })
        }
        // additional rules by input type
        // console.log(`childSpec._thisNode.input`, childSpec._thisNode.input)
        if (childSpec._thisNode.input === 'input/number') {
          result.validate[`validate_${count++}`] = (value) => {
            return !isNaN(Number(value)) || "Must be a number"
          }
        } else if (childSpec._thisNode.input === 'input/expression') {
          result.validate[`validate_${count++}`] = (value) => {
            try {
              parseExpression(String(value))
              return true
            } catch (err) {
              return String(err)
            }
          }
        } else if (childSpec._thisNode.input === 'input/statement') {
          result.validate[`validate_${count++}`] = (value) => {
            try {
              parse(value, {
                allowReturnOutsideFunction: true, // allow return in the block statement
              })
              return true
            } catch (err) {
              return String(err)
            }
          }
        }
        // return all rules
        return result
      })()}
      render={innerProps =>
        {
          if (childSpec._thisNode.input === 'input/switch') {
            return (
              <FormControl
                className={styles.formControl}
                error={!!_.get(errors, name)}
                >
                <FormHelperText
                  required={!childSpec.optional}>
                  {childSpec.desc}
                </FormHelperText>
                <Switch
                  name={name}
                  checked={innerProps.value}
                  onChange={e => innerProps.onChange(e.target.checked)}
                />
                {
                  !!_.get(errors, name)
                  &&
                  <FormHelperText>{_.get(errors, name)?.message}</FormHelperText>
                }
              </FormControl>
            )
          } else if
          (
            childSpec._thisNode.input === 'input/expression'
            || childSpec._thisNode.input === 'input/statement'
          ) {
            return (
              <Box
                className={styles.labelControl}
                >
              <FormControl
                className={styles.formControl}
                error={!!_.get(errors, name)}
                >
                <InputLabel
                  shrink={true}
                  required={!childSpec.optional}
                  className={styles.label}
                  >
                  {childSpec.desc}
                </InputLabel>
                <Box className={styles.editor}>
                  <ControlledEditor
                    className={styles.editor}
                    language="javascript"
                    options={{
                      readOnly: false,
                      // lineNumbers: 'off',
                      lineNumbersMinChars: 0,
                      wordWrap: 'on',
                      wrappingIndent: 'deepIndent',
                      scrollBeyondLastLine: false,
                      wrappingStrategy: 'advanced',
                      glyphMargin: false,
                      folding: false,
                      // lineDecorationsWidth: 0,
                      renderLineHighlight: 'none',
                      // snippetSuggestions: 'none',
                      minimap: {
                        enabled: false
                      },
                      quickSuggestions: {
                        "other": false,
                        "comments": false,
                        "strings": false
                      },
                    }}
                    onFocus={e => {console.log(`focus`, e)}}
                    value={innerProps.value}
                    onChange={(ev, value) => {
                      innerProps.onChange(value)
                    }}
                    >
                  </ControlledEditor>
                </Box>
                <Input
                  // rows={0}
                  // className={`${styles.dummyTextField} Mui-focused`}
                  className={`${styles.dummyTextField}`}
                  readOnly={true}
                  focused={true}
                  // size="small"
                  // margin="none"
                  inputProps={{style:{height:0}}}
                  // InputProps={{style:{height:0}}}
                  style={{height:0}}
                  error={!!_.get(errors, name)}
                  >
                </Input>
                {
                  !!_.get(errors, name)
                  &&
                  <FormHelperText>{_.get(errors, name)?.message}</FormHelperText>
                }
              </FormControl>
              </Box>
            )
          } else {
            return (
              <FormControl className={styles.formControl}>
                <TextField
                  label={childSpec.desc}
                  name={name}
                  value={innerProps.value}
                  required={!childSpec.optional}
                  size="small"
                  onChange={innerProps.onChange}
                  error={!!_.get(errors, name)}
                  helperText={_.get(errors, name)?.message}
                  />
              </FormControl>
            )
          }
        }
      }
    />
  )
})

export default InputField
