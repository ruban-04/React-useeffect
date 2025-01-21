import React from 'react'

function City() {
  return (
    <div>
          <label className="label2" htmlFor="country">
              City
                <select
                    className="box4"
                    name="city"
                   
                >
                    <option value="" disabled>
                        Select City
                    </option>
                    <option value="Chennai">Chennai</option>
                    <option value="Madurai">Madurai </option>
                    <option value="Thirchy">Thirchy</option>
                    <option value="Thanjavur">Thanjavur</option>
                    <option value="Thiruvarur">Thiruvarur</option>
                    <option value="Nagapattinam">Nagapattinam</option>
                    <option value="Coimbatore">Coimbatore</option>
                </select>
                </label>
      
    </div>
  )
}

export default City
