import { useState } from "react";
import { Form, Row, Col, Dropdown, Button, InputNumber, Select, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { TInsuranceFilter } from "../common/insurance.type";

const { Option } = Select;

const InsuranceFilterForm = ({ handleFilterChange, setFilter }: TProps) => {
    const [form] = Form.useForm();
    const [minPremium, setMinPremium] = useState<number | null>(null);
    const [maxPremium, setMaxPremium] = useState<number | null>(null);

    const [minCoverage, setMinCoverage] = useState<number | null>(null);
    const [maxCoverage, setMaxCoverage] = useState<number | null>(null);
    const [selectedInsuranceType, setSelectedInsuranceType] = useState<string[]>([]);
    const [sortOrder, setSortOrder] = useState<string>("ASC");

    const handleInsuranceTypeChange = (value: string[]) => {
        console.log(value);        
        setSelectedInsuranceType(value);
    };

    const handlePremiumChange = (field: "min" | "max", value: number | null) => {
        if (field === "min") setMinPremium(value);
        else setMaxPremium(value);
    };

    const handleCoverageChange = (field: "min" | "max", value: number | null) => {
        if (field === "min") setMinCoverage(value);
        else setMaxCoverage(value);
    };

    const handleSortOrderChange = (value: string) => {
        setSortOrder(value)
    };

    const handleSubmit = () => {
        handleFilterChange(selectedInsuranceType, minPremium, maxPremium,minCoverage,maxCoverage, sortOrder)
    };

    const handleClear = () => {
        setSelectedInsuranceType([]);
    };

    const handleReset = () => {
        form.resetFields()
        setMinPremium(null);
        setMaxPremium(null);
        setMinCoverage(null);
        setMaxCoverage(null);
        setSelectedInsuranceType([]);
        setSortOrder("ASC");
        setFilter({
            sortOrder: "ASC",
            minimumPremium: undefined,
            maximumPremium: undefined,
            types: [],
        });
        handleFilterChange([], null, null,null, null, sortOrder)
    }

    const insuranceMenu = (
        <Select
            mode="multiple"
            allowClear
            placeholder="Select Insurance Type"
            style={{ width: "100%" }}
            value={selectedInsuranceType}
            onChange={handleInsuranceTypeChange}
            onClear={handleClear}
        >
            <Option value="TERM_LIFE">Term Life</Option>
            <Option value="HEALTH">Health</Option>
            <Option value="VEHICLE">Vehicle</Option>
        </Select>
    );

    const sortMenu = (
        <Select
            allowClear
            placeholder="Select Sort Order"
            style={{ width: "100%" }}
            onChange={handleSortOrderChange}
            value={sortOrder}
        >
            <Option value="ASC">Ascending</Option>
            <Option value="DESC">Descending</Option>
        </Select>
    );


    const premiumMenu = (
        <div style={{ padding: "10px", width: "200px" }}>
            <InputNumber
                placeholder="Min Premium"
                min={0}
                value={minPremium}
                style={{ width: "100%", marginBottom: "8px" }}
                onChange={(value) => handlePremiumChange("min", value)}
            />
            <InputNumber
                placeholder="Max Premium"
                min={0}
                value={maxPremium}
                style={{ width: "100%" }}
                onChange={(value) => handlePremiumChange("max", value)}
            />
        </div>
    );

    const coverageMenu = (
        <div style={{ padding: "10px", width: "200px" }}>
            <InputNumber
                placeholder="Min Coverage Amount"
                min={0}
                value={minCoverage}
                style={{ width: "100%", marginBottom: "8px" }}
                onChange={(value) => handleCoverageChange("min", value)}
            />
            <InputNumber
                placeholder="Max Coverage Amount"
                min={0}
                value={maxCoverage}
                style={{ width: "100%" }}
                onChange={(value) => handleCoverageChange("max", value)}
            />
        </div>
    );

    return (
        <Form form={form} layout="vertical" onFinish={() => handleSubmit()}>
            {/* <div className="mb-6 font-bold">Filters:</div>
             */}
            <p>
                <Tag bordered={false} color="processing" className="mb-4 mt-2">
                    Filters :
                </Tag>
            </p>
            <Row gutter={[16, 16]} justify="center" align="middle">
                <Col>
                    <Dropdown overlay={insuranceMenu} trigger={["click"]}>
                        <Button type="default" style={{ borderColor: "#1890ff", color: "#1890ff", width: "200px" }}>
                            Insurance Type <DownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown overlay={premiumMenu} trigger={["click"]}>
                        <Button type="default" style={{ borderColor: "#1890ff", color: "#1890ff", width: "200px" }}>
                            Premium Amount <DownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown overlay={coverageMenu} trigger={["click"]}>
                        <Button type="default" style={{ borderColor: "#1890ff", color: "#1890ff", width: "200px" }}>
                            Coverage Amount <DownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Dropdown overlay={sortMenu} trigger={["click"]}>
                        <Button type="default" style={{ borderColor: "#1890ff", color: "#1890ff", width: "200px" }}>
                            Sort Order <DownOutlined />
                        </Button>
                    </Dropdown>
                </Col>
                <Col>
                    <Button type="primary" htmlType="submit">
                        Apply Filters
                    </Button>
                </Col>
                <Col>
                    <Button htmlType="reset"
                        onClick={() => handleReset()}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        </Form>
    );
};

export default InsuranceFilterForm;

type TProps = {
    setFilter: React.Dispatch<
        React.SetStateAction<TInsuranceFilter>
    >
    handleFilterChange: (insuranceType: string[], 
        minPremium: number | null, maxPremium: number | null,
        minCoverage: number | null, maxCoverage: number | null,
        sortOrder: string) => void;
}
