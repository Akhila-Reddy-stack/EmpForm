

import { Input } from '../Components/Forms/Input';
import { Form } from 'informed';
import { withSnackbar } from 'notistack';
import React, { Fragment, PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Button, FormGroup } from 'reactstrap';
import { Col, Container, Row } from 'reactstrap';
import { Empregistration } from '../Services/Empservice.js'
import { CustomSelect } from '../Components/Forms/custom-select'

const options = {
    variant: "success",
    anchorOrigin: {
        vertical: "top",
        horizontal: "center",
        autoHideDuration: 500,
    },
};

const Eoptions = {
    variant: "warning",
    anchorOrigin: {
        vertical: "top",
        horizontal: "center",
        autoHideDuration: 500,
    },
};
class EmpForm extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            Gender: [{ value: "M", label: "Male" }, { value: "F", label: "Female" }],
            gender:''
        }
    }

    componentDidMount = () => {
    }

    setFormApi = (formApi) => {
        this.formApi = formApi;
    }

    handleChange = async ({ currentTarget: Input }) => {
        const { id: name, value } = Input;
        const { data } = this.state;
        data[name] = value;
        await this.setState({ data })
        console.log(this.state)
    }
    handleType = async(e) => {
        console.log(e)
        await this.setState({ gender: e.value })
        console.log(this.state.value)
    }
    onSubmit = async () => {
        // const data = [];
        const { data, EmpName, Age, gender, Gender } = this.state;
        data["EmpName"] = data.EmpName
        data["Age"] = data.Age
        data["Gender"] = gender
        data["Phone"] = data.Phone
        console.log(data)
        if (data.EmpName && data.Age && gender && data.Phone) {
            const res = await Empregistration(data);
            console.log(res)
            if (res.data.status === true) {
                this.props.enqueueSnackbar("Success !", options, 500);

            } else {
                this.props.enqueueSnackbar("Sorry Failed!!", Eoptions, 500);

            }
            await this.setState({
                data: {}
            })
            setTimeout(`location.href = '/registration';`);
        }
        else if (!data.EmpName && !data.Age && !gender && !data.Phone) {
            this.props.enqueueSnackbar("Please Fill all details!!", Eoptions, 500);
        }

    }

    render() {
        const { Gender } = this.state;
        return (
            <Fragment>
                <div class="login-form">

                    <div className="empform">


                        <div className="text-center emp-header">Employee Form</div>

                        <div>  <Form getApi={this.setFormApi} onSubmit={this.onSubmit}>
                            {({ formApi, formState }) => (
                                <div>
                                    <Input field="EmpName" label="Employee Name"
                                        onChange={this.handleChange}
                                    />

                                    <Input field="Age" type="number" label="Age"
                                        onChange={this.handleChange}
                                    />

                                    <label className="hintparagraph">Gender<span ></span></label>
                                    <CustomSelect field="Gender" name="Gender" getOptionValue={option => option.value}
                                        getOptionLabel={option => option.label}
                                        options={Gender}
                                        onChange={e => this.handleType(e)}
                                        required
                                    />

                                    <Input field="Phone" type="number" label="Phone"
                                        onChange={this.handleChange}
                                    />
                                    <div> <Button type="submit" className="onsubmit-btn" value="Submit"  >
                                        Submit</Button></div>

                                </div>
                            )}
                        </Form> </div>


                    </div>

                </div>


            </Fragment>
        );
    }
}

export default withSnackbar(EmpForm);



