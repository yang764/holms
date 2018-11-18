import React, { Component } from 'react';
import { Icon } from 'antd';
import Input from '../../../../components/uielements/input';
import Button from '../../../../components/uielements/button';
import TableWrapper from '../antTable.style';
import PropTypes from 'prop-types';

export default class FilterView extends Component {
  constructor(props) {
    super(props);
    this.onSearch = this.onSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.state = {
      dataList: this.props.dataList.getAll(),
      filterDropdownVisible: false,
      searchText: '',
      filtered: false,
      searchColumn: props.searchColumn
    };
  }
  onSearch() {
    let { searchText } = this.state;
    searchText = searchText.toUpperCase();
    const dataList = this.props.dataList
      .getAll()
      .filter(data => data[this.state.searchColumn].toUpperCase().includes(searchText));
    this.setState({
      dataList,
      filterDropdownVisible: false,
      searchText: '',
      filtered: false
    });
  }
  onInputChange(event) {
    this.setState({ searchText: event.target.value });
  }

  aRef(ele) {
    this.searchInput = ele;
  }

  render() {
    const filterDropdown = (
      <div className="isoTableSearchBox">
      {(this.props.hasRef)?<Input
          id="tableFilterInput"
          ref={this.aRef.bind(this)}
          placeholder="Search name"
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
        />:<Input
          id="tableFilterInput"
          placeholder="Search name"
          value={this.state.searchText}
          onChange={this.onInputChange}
          onPressEnter={this.onSearch}
        />}
        
        <Button type="primary" onClick={this.onSearch}>
          Search
        </Button>
      </div>
    );
    const columns = this.props.tableInfo.columns;
    columns[0] = {
      ...columns[0],
      filterDropdown,
      filterIcon: (
        <Icon
          type="search"
          style={{ color: this.state.filtered ? '#108ee9' : '#aaa' }}
        />
      ),
      filterDropdownVisible: this.state.filterDropdownVisible,
      onFilterDropdownVisibleChange: visible =>
        this.setState({ filterDropdownVisible: visible }, () =>
          document.getElementById('tableFilterInput').focus()
        )
    };
    return (
      <TableWrapper
        columns={columns}
        onChange={this.onChange}
        dataSource={this.state.dataList}
        className="isoSearchableTable"
      />
    );
  }
}

const { string } = PropTypes;

FilterView.propTypes = {
  searchColumn: string.isRequired
};
