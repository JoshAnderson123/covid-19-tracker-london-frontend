import React from 'react'

export default function StatBlock({ hAlign, vDirection, stat1, stat2 }) {
  return (
    <div className="stat-block-container">
      <div className={`${hAlign} ${vDirection === "top" ? "stat-big" : "stat-small"}`}>{stat1}</div>
      <div className={`${hAlign} ${vDirection === "top" ? "stat-small" : "stat-big"}`}>{stat2}</div>
    </div>
  )
}
