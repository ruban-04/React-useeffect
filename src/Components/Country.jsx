import React from 'react'

function Country() {
  return (
    <div>
        <label className="label2" htmlFor="country">
                Country
                <select
                    className="box4"
                    name="country"
                   
                >
                    <option value="" disabled>
                        Select Country
                    </option>
                    <option value="India">India</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                    <option value="London">London</option>
                    <option value="France">France</option>
                    <option value="Latvia">Latvia</option>
                    <option value="Canada">Canada</option>
                    <option value="America">America</option>
                </select>
                </label>
    </div>
  )
}

export default Country
