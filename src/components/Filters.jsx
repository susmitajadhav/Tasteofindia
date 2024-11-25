import React from 'react';
import './Filters.css';

const Filters = () => {
    return (
        <aside className="filters">
            <h3 className="filters-title">Filters</h3>

            <div className="filter">
                <label className="filter-label">
                    <input type="checkbox" name="diet" value="vegetarian" id="vegetarian" />
                    <span className="checkmark"></span>
                    Vegetarian
                </label>
            </div>

            <div className="filter">
                <label className="filter-label">
                    <input type="checkbox" name="diet" value="non-vegetarian" id="non-vegetarian" />
                    <span className="checkmark"></span>
                    Non Vegetarian
                </label>
            </div>

            <div className="filter">
                <label className="filter-label">
                    <input type="checkbox" name="diet" value="vegan" id="vegan" />
                    <span className="checkmark"></span>
                    Vegan
                </label>
            </div>

            {/* Add more filters here */}

            <button className="filter-apply">
                Apply Filters
            </button>
        </aside>
    );
};

export default Filters;
