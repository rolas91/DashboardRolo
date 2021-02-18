import React, {
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Table, Input, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Highlighter from "highlight-words";
/**
   * Para utilizarlo fuera se debe hacer lo siguiente
   * 
   * import{ useRef } from 'react'
   * 
   * const grid = useRef()
   * 
   * columns = [{
                  title: 'Propietario',
                  dataIndex: 'propietario',
                  key: '1',
                  ...(grid.current.getColumnSearch('propietario'))
              }]
   * 
   */

const FilteredGrid = forwardRef((props, ref) => {
  const [rows, setRows] = useState(props.rows);
  const [columns, setColumns] = useState(props.columns);
  const [searchInput, setSearchInfo] = useState();
  const [searchText, setSearchText] = useState();
  const [searchedColumn, setSearchedColumns] = useState();

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            setSearchInfo(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <FilterOutlined
        type="search"
        style={{ color: filtered ? "#1890ff" : undefined }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        if (searchInput) setTimeout(() => searchInput.select());
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text.toString()}
        />
      ) : (
        text
      ),
  });
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumns(dataIndex);
    /*this.setState({ 
            searchText: selectedKeys[0],
            searchedColumn: dataIndex,
            });*/
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
    //this.setState({ searchText: '' });
  };

  useImperativeHandle(ref, () => ({
    getColumnSearch(dataIndex) {
      return getColumnSearchProps(dataIndex);
    },
  }));

  useEffect(() => {
    setRows(props.rows);
    console.log("rows enviados: ", props.rows);
  }, [props.rows]);

  useEffect(() => {
    setColumns(props.columns);
    console.log("columns enviadas: ", props.columns);
  }, [props.columns]);

  return (
    <Table
      style={{ fontFamily: "Lato, sans-serif" }}
      size="small"
      columns={columns}
      dataSource={rows}
      // rowClassName={record => record.color.replace('#', '')}
      rowKey={(record) => record.id}
      scroll={{ x: 1155 }}
      responsive
    />
  );
});

export default FilteredGrid;
