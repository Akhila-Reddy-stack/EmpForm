import React, { Fragment, PureComponent } from "react";
import _ from "lodash";
import { withSnackbar } from "notistack";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as InoIcons from "react-icons/io";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Row,
  Container,
  Breadcrumb,
  BreadcrumbItem,
} from "reactstrap";
import { EmpList } from '../Services/Empservice';


const { SearchBar } = Search;

const options = {
  variant: "success",
  anchorOrigin: {
    marginTop: "4rem",
    vertical: "top",
    horizontal: "center",
  },
};
const Eoptions = {
  variant: "warning",
  anchorOrigin: {
    vertical: "top",
    horizontal: "center",
    autoHideDuration: 5000,
  },
};

class EmployeeList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isTableLoading: true,
      loading:true,
      EmpList:[]
    };
    this.notificationDOMRef = React.createRef();
  }

  componentDidMount = async () => {
  
    await this.EmpList();
    await this.initTableData();
    setTimeout(
      function () {
        this.setState({ loading: false })
      }.bind(this),
      600
    )
  };

  EmpList = async () => {
    console.log("oooo");
    let res = await EmpList();
    console.log(res);
    if (res.data.status === true) {
      await this.setState({
        EmpList: res.data.data,
      });
    
      res.data.data.map((d, i) => {
        d["Sno"] = i + 1;
      });
    }
    console.log(this.state)
    await this.initTableData();
  };

 
  initTableData = async () => {
    const { hideColumns } = this.state;
    const columnHeaders = this.getColumnHeaders(this.props.prefixUrl);
    const columns = getColumns(columnHeaders, hideColumns);
    await this.setState({ columns, columnHeaders, hideColumns });
  };

  getColumnHeaders(prefixUrl = "") {
    //dynamic headers
    let allKeys = [
      "Sno",
      "EmpName",
      "Age",
      "Gender",
      "MobileNumber",
     
    ];
    let excludeKeys = [];
    let keys = _.filter(allKeys, (v) => !_.includes(excludeKeys, v));
    let def = {
      Sno: { dataField: "Sno", text: "Sl.No", sort: true },
      EmpName: { dataField: "EmpName", text: "Employee Name", sort: true },
      Age: {
        dataField: "Age",
        text: "Age",
        sort: true,
      },
      Gender: {
        dataField: "Gender",
        text: "Gender", sort: true
      },
      MobileNumber: { dataField: "MobileNumber", text: "Mobile Number", sort: true }

    };
    return { keys:keys ,def: def };
  }

  render() {
    const { EmpList, data, columns, inventryList } = this.state;
    console.log(this.state);
    return (
      <Fragment>
        <Container>
       
          <Row>
            <Col
              md={12}
              style={{
                textAlign: "center",
                marginTop: "14px",
                paddingLeft: "19px",
              }}
            >
              <Breadcrumb>
            
                <BreadcrumbItem active>Employee List</BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Row>
        </Container>
        <br />
        <Container>
          <Row>
            <Col md={12}>
              <div class="card">
                <div
                  className="table-div1"
                  id="tablepaddingnew"
                >
                  {EmpList && columns && (
                    <ToolkitProvider
                      keyField="id"
                      data={EmpList}
                      columns={columns}
                      search
                    >
                      {(props) => (
                        <div>
                          <Row className="addrowpadding">
                            <Col sm={10}>
                              <div className="d-flex justify-content-end">
                               
                              </div>
                            </Col>
                            <Col sm={2} className="search-btn">
                              <SearchBar {...props.searchProps} />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <div className=" table-div1">
                                <BootstrapTable
                                  keyField=""
                                  data={EmpList}
                                  columns={columns}
                                  {...props.baseProps}
                                  bootstrap4
                                  pagination={paginationFactory()}
                                  striped
                                  hover
                                  condensed
                                  classes="table table-bordered table-hover table-sm"
                                  wrapperClasses="table-responsive"
                                  
                                  noDataIndication={"No data to display here"}
                                />
                              </div>
                            </Col>
                          </Row>
                        </div>
                      )}
                    </ToolkitProvider>
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        {/* } */}
      </Fragment>
    );
  }
}

export default withSnackbar(EmployeeList);

function getColumns(columnsHeaders, hideColumns) {
  let columns = [];
  const { keys, def } = columnsHeaders;

  _.forEach(keys, (key) => {
    columns.push({ ...def[key], hidden: _.includes(hideColumns, key) });
  });
  return columns;
}
