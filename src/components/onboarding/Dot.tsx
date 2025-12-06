import { StyleSheet, View } from 'react-native'
import React from 'react'

interface DotProps {
  index: number
  currentPage: number
}

const Dot: React.FC<DotProps> = ({ index, currentPage }) => {
  currentPage === index
  return (
    <View
      style={[
        styles.dot,
        { backgroundColor: currentPage === index ? '#1E40AF' : '#E5E7EB', width: currentPage === index ? 16 : 37 },
      ]}
    />
  )
}

export default Dot

const styles = StyleSheet.create({
  dot: {
    height: 8,
    marginHorizontal: 6,
    borderRadius: 8 / 2,
    justifyContent: 'center',
  },
})
