
import React from 'react'

type Props<T> = {
    items: T[]
    renderItem: (item: T) => React.ReactNode
}

const List = <T,>({items,renderItem}: Props<T>) => {
  return (
    <div>
        {items.map(renderItem)}
    </div>
  )
}

export default List