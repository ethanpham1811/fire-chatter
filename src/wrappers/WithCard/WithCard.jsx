import React from 'react'

function WithCard(Component) {
  return (props) => {
    return (
      <div className="p-5 rounded-2xl shadow-card bg-white">
        <Component {...props} />
      </div>
    )
  }
}

export default WithCard
