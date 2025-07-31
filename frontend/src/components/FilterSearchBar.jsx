import { useState } from "react";
import "./FilterSearchBar.css";

const FilterSearchBar = ({
  search,
  SearchChange,
  onFilterChange,
  userOptions = ["admin", "employee", "manager"],
  statusOptions = ["completed", "in-process", "pending"]
}) => {
  const [filters, setFilters] = useState({
    user: "",
    status: ""
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange && onFilterChange(newFilters);
  };

  return (
    <div className="filterSearchBarWrapper row-layout">
      <div className="searchBox">
        <input
          className="searchInput"
          type="text"
          name="search"
          placeholder="Search something"
          value={search}
          onChange={SearchChange}
        />
        <button className="searchButton" type="button">
          🔍
        </button>
      </div>

      <div className="filters">
        <select
          className="filterDropdown"
          name="user"
          value={filters.user}
          onChange={handleFilterChange}
        >
          <option value="">All Users</option>
          {userOptions.map((role) => (
            <option key={role} value={role}>
              {role.charAt(0).toUpperCase() + role.slice(1)}
            </option>
          ))}
        </select>

        <select
          className="filterDropdown"
          name="status"
          value={filters.status}
          onChange={handleFilterChange}
        >
          <option value="">All Status</option>
          {statusOptions.map((status) => (
            <option key={status} value={status}>
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterSearchBar;
