import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  Box,
  Button,
  IconButton,
  Fab,
  Menu,
  MenuItem,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core'
import {
  DeleteOutlineOutlined,
} from '@material-ui/icons'
import { default as NestedMenuItem } from 'material-ui-nested-menu-item'
import {
  Layout,
  Tree,
  Tabs,
  Radio,
  Tooltip,
  Button as AntButton,
} from 'antd'
const { Header, Footer, Sider, Content } = Layout
const {
  TreeNode,
  DirectoryTree,
} = Tree
const { TabPane } = Tabs;
import {
  DeleteOutlined,
  Icon,
} from '@ant-design/icons'
import { v4 as uuidv4 } from 'uuid'
import { useForm, Controller } from "react-hook-form";
import { parse, parseExpression } from "@babel/parser"

import * as api from 'app-x/api'
import ReactIcon from 'app-x/icon/React'
import { parse_js, lookup_icon_for_type, lookup_valid_child_types } from 'app-x/builder/ui/util_parse'
import { tree_traverse, tree_lookup, lookup_child_by_ref } from 'app-x/builder/ui/util_tree'
import EditorProvider from 'app-x/builder/ui/EditorProvider'

// make context menu
const SyntaxMenu = (props) => {

  // styles
  const styles = makeStyles((theme) => ({
    menuItem: {
      minWidth: 200,
    },
    nestedMenuItem: {
      padding: 0,
    },
  }))()

  // context
  const {
    treeData,
    expandedKeys,
    setExpandedKeys,
    selectedKey,
    setSelectedKey,
  } = useContext(EditorProvider.Context)

  // const [ menuPosition, setMenuPosition ] = useState(null)

  // check props.selectedNode
  if (!props.selectedNode) {
    return null
  }

  const valid_child_types = lookup_valid_child_types(props.selectedNode.data.type)

  return (
    <Menu
      keepMounted={true}
      getContentAnchorEl={null}
      anchorEl={props.contextAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left',
      }}
      open={Boolean(props.contextAnchorEl)}
      onClose={ e => props.setContextAnchorEl(null) }
      >
      {
        (
          !!props.selectedNode
          && !!props.selectedNode.data
          && !!props.selectedNode.data.type
          && (!!valid_child_types?._?.types && !!valid_child_types?.ref?.types)
        )
        &&
        (
          <Box>
            {
              valid_child_types?.ref.names.map(name => {
                const exists = lookup_child_by_ref(props.selectedNode, name)
                if (exists) {
                  return null
                }
                return (
                  <NestedMenuItem
                    className={styles.nestedMenuItem}
                    key={uuidv4()}
                    label={(
                      <List className={styles.nestedMenuItem}>
                        <ListItem
                          dense={true}
                          className={styles.menuItem}
                          >
                          <ListItemIcon>
                            { lookup_icon_for_type('js/object') }
                          </ListItemIcon>
                          <ListItemText primary={`[ ${name} ]`} />
                        </ListItem>
                      </List>
                    )}
                    parentMenuOpen={!!props.contextAnchorEl}
                    >
                    {
                      valid_child_types?.ref.types.map(type => {
                        if (!!type) {
                          return (
                            <MenuItem
                              dense={true}
                              className={styles.menuItem}
                              key={uuidv4()}
                              onClick={
                                () => props.addMenuClicked({
                                  nodeRef: name,
                                  nodeRefRequired: true,
                                  nodeKey: props.selectedNode.key,
                                  nodeType: type,
                                  isSwitchDefault: (props.selectedNode.data.type && name === 'default'),
                                })
                              }
                              >
                              <ListItemIcon>
                                { lookup_icon_for_type(type) }
                              </ListItemIcon>
                              <ListItemText primary={`Add ${type}`} />
                            </MenuItem>
                          )
                        } else {
                          return (
                            <Divider key={uuidv4()} />
                          )
                        }
                      })
                    }
                  </NestedMenuItem>
                )
              })
              .concat([<Divider key={uuidv4()} />])
              .concat(valid_child_types?._.types.map(type => {
                if (!!type) {
                  return (
                    <MenuItem
                      dense={true}
                      className={styles.menuItem}
                      key={uuidv4()}
                      onClick={
                        () => props.addMenuClicked({
                          nodeRef: null,
                          nodeRefRequired: false,
                          nodeKey: props.selectedNode.key,
                          nodeType: type,
                        })
                      }
                      >
                      <ListItemIcon>
                        { lookup_icon_for_type(type) }
                      </ListItemIcon>
                      <ListItemText primary={`Add ${type}`} />
                    </MenuItem>
                  )
                } else {
                  return (
                    <Divider key={uuidv4()} />
                  )
                }
              }))
            }
          </Box>
        )
      }
      {
        (
          !!props.selectedNode
          && !!props.selectedNode.data
          && !!props.selectedNode.data.type
          && (!!valid_child_types?._?.types && !valid_child_types?.ref?.types)
        )
        &&
        (
          <Box>
            {
              valid_child_types?._.types.map(type => {
                if (!!type) {
                  return (
                    <MenuItem
                      dense={true}
                      className={styles.menuItem}
                      key={uuidv4()}
                      onClick={
                        () => props.addMenuClicked({
                          nodeRef: null,
                          nodeRefRequired: false,
                          nodeKey: props.selectedNode.key,
                          nodeType: type,
                        })
                      }
                      >
                      <ListItemIcon>
                        { lookup_icon_for_type(type) }
                      </ListItemIcon>
                      <ListItemText primary={`Add ${type}`} />
                    </MenuItem>
                  )
                } else {
                  return (
                    <Divider key={uuidv4()} />
                  )
                }
              })
            }
          </Box>
        )
      }
      {
        (
          !!props.selectedNode
          && !!props.selectedNode.data
          && !!props.selectedNode.data.type
          && (!valid_child_types?._?.types && !!valid_child_types?.ref?.types)
        )
        &&
        (
          <Box>
            {
              !!valid_child_types?.ref?.names
              &&
              (
                valid_child_types?.ref.names.map(name => {
                  const exists = lookup_child_by_ref(props.selectedNode, name)
                  if (exists) {
                    return null
                  }
                  return (
                    <NestedMenuItem
                      className={styles.nestedMenuItem}
                      key={uuidv4()}
                      label={(
                        <List className={styles.nestedMenuItem}>
                          <ListItem
                            dense={true}
                            className={styles.menuItem}
                            >
                            <ListItemIcon>
                              { lookup_icon_for_type('js/object') }
                            </ListItemIcon>
                            <ListItemText primary={`[ ${name} ]`} />
                          </ListItem>
                        </List>
                      )}
                      parentMenuOpen={!!props.contextAnchorEl}
                      >
                      {
                        valid_child_types?.ref.types.map(type => {
                          if (!!type) {
                            return (
                              <MenuItem
                                dense={true}
                                className={styles.menuItem}
                                key={uuidv4()}
                                onClick={
                                  () => props.addMenuClicked({
                                    nodeRef: name,
                                    nodeRefRequired: true,
                                    nodeKey: props.selectedNode.key,
                                    nodeType: type,
                                    isSwitchDefault: (props.selectedNode.data.type && name === 'default'),
                                  })
                                }
                                >
                                <ListItemIcon>
                                  { lookup_icon_for_type(type) }
                                </ListItemIcon>
                                <ListItemText primary={`Add ${type}`} />
                              </MenuItem>
                            )
                          } else {
                            return (
                              <Divider key={uuidv4()} />
                            )
                          }
                        })
                      }
                    </NestedMenuItem>
                  )
                })
              )
            }
            {
              !valid_child_types?.ref?.names
              &&
              (
                valid_child_types?.ref.types.map(type => {
                  if (!!type) {
                    return (
                      <MenuItem
                        dense={true}
                        className={styles.menuItem}
                        key={uuidv4()}
                        onClick={
                          () => props.addMenuClicked({
                            nodeRef: null,
                            nodeRefRequired: true,
                            nodeKey: props.selectedNode.key,
                            nodeType: type,
                          })
                        }
                        >
                        <ListItemIcon>
                          { lookup_icon_for_type(type) }
                        </ListItemIcon>
                        <ListItemText primary={`Add ${type}`} />
                      </MenuItem>
                    )
                  } else {
                    return (
                      <Divider key={uuidv4()} />
                    )
                  }
                })
              )
            }
          </Box>
        )
      }
      {
        !!props.selectedNode
        && !!props.selectedNode.data
        && !!props.selectedNode.data.type
        && props.selectedNode.data.type !== '/'
        &&
        (
          <Box>
            <Divider key={uuidv4()} />
            <MenuItem
              dense={true}
              className={styles.menuItem}
              onClick={
                () => props.deleteMenuClicked({
                  nodeKey: selectedKey,
                })
              }
              >
              <ListItemIcon>
                <DeleteOutlined />
              </ListItemIcon>
              <ListItemText primary="Delete" />
            </MenuItem>
          </Box>
        )
      }
    </Menu>
  )
}

export default SyntaxMenu