import React from 'react'

function State() {
  return (
    <div>
            <label className="label2" htmlFor="state">
                State
                <select
                    className="box4"
                    name="state"
                   
                >
                    <option value="" disabled>
                        Select State
                    </option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Kerala">Kerala</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Assam">Assam</option>
                    <option value="New Delhi">New Delhi</option>
                </select>
            </label>
    </div>
  )
}

export default State
