import React, { FC, ReactElement, useRef, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  View,
} from 'react-native'
import { Icon, Text } from 'react-native-elements'
import { InputCell } from './InputCell'
import { TextField } from './TextField'
import { Control } from 'react-hook-form'

interface SelectFieldProps {
  label: string
  options: SelectOption[]
  onSelect: (item: SelectOption) => void
  name: string
  control: Control<any, any>
}
export const SelectField: React.FC<SelectFieldProps> = ({
  label,
  options,
  onSelect,
  name,
  control,
}) => {
  return (
    <Dropdown
      label={label}
      data={options}
      onSelect={onSelect}
      name={name}
      control={control}
    ></Dropdown>
  )
}

export interface SelectOption {
  label: string
  value: string
}
interface Props {
  label: string
  data: Array<{ label: string; value: string }>
  onSelect: (item: { label: string; value: string }) => void
  name: string
  control: Control<any, any>
}

const Dropdown: FC<Props> = ({ label, data, onSelect, control, name }) => {
  const DropdownButton = useRef()
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState<
    { value: any; label: string } | undefined
  >(undefined)
  const [dropdownTop, setDropdownTop] = useState(0)

  const toggleDropdown = (): void => {
    visible ? setVisible(false) : openDropdown()
  }

  const openDropdown = (): void => {
    if (DropdownButton && DropdownButton.current) {
      DropdownButton.current.measure(
        (
          _fx: number,
          _fy: number,
          _w: number,
          h: number,
          _px: number,
          py: number
        ) => {
          setDropdownTop(py + h)
        }
      )
      setVisible(true)
    }
  }

  const onItemPress = (item: any): void => {
    console.log('item', item)
    setSelected(item)
    onSelect(item)
    setVisible(false)
  }

  const renderItem = ({ item }: any): ReactElement<any, any> => (
    <TouchableOpacity style={styles.item} onPress={() => onItemPress(item)}>
      <Text>{item.label}</Text>
    </TouchableOpacity>
  )

  const renderDropdown = (): ReactElement<any, any> => {
    return (
      <Modal visible={visible} transparent animationType="none">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setVisible(false)}
        >
          <View style={[styles.dropdown, { top: dropdownTop }]}>
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    )
  }

  return (
    <TouchableOpacity
      ref={DropdownButton}
      testID="select-input"
      style={styles.button}
      onPress={toggleDropdown}
    >
      {renderDropdown()}
      <View style={{ flex: 1 }}>
        <TextField
          label={label}
          defaultValue={selected?.label}
          name={name}
          control={control}
          endIcon={'chevron-down'}
          onIconClick={toggleDropdown}
        />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    height: 50,
    zIndex: 1,
    flex: 1,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    backgroundColor: '#fff',
    width: '100%',
    shadowColor: '#000000',
    shadowRadius: 4,
    shadowOffset: { height: 4, width: 0 },
    shadowOpacity: 0.5,
    flex: 1,
  },
  overlay: {
    width: '100%',
    height: '100%',
  },
  item: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
})

export default Dropdown
