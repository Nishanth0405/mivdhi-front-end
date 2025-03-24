import {  Col, Card, Input, Row, Table, } from "antd";
import { TInsuranceFilter, TInsuranceList } from "../common/insurance.type";
import { useState } from "react";
import InsuranceFilterForm from "./InsuranceFilter";
import { SearchOutlined } from "@ant-design/icons";


const InsuranceList = ({ insuranceList, onSearch, loader }: TProps) => {

   

    const [filter, setFilter] = useState<TInsuranceFilter>({
        page: 1,
        sortOrder: "ASC",
        minimumPremium: 0,
    });
    console.log("loader --> ",loader,filter);


    const handleSearch = (value: string) => {
        setFilter((prevFilter) => {
            const updatedFilter = { ...prevFilter, searchTerm: value };
            onSearch(updatedFilter);
            return updatedFilter;
        });
    };


    const handleFilterChange = (insuranceType: string[],
        minPremium: number | null, maxPremium: number | null,
        minCoverage: number | null, maxCoverage: number | null,
        sortOrder: string) => {
        console.log("Before update --> ", insuranceType, maxPremium, minPremium);

        setFilter((prevFilter) => {
            const updatedFilter = {
                ...prevFilter,
                sortOrder: sortOrder ?? "ASC",
                maximumPremium: maxPremium ?? prevFilter.maximumPremium,
                minimumPremium: minPremium ?? prevFilter.minimumPremium,
                minimumCoverage: minCoverage ?? prevFilter.minimumCoverage,
                maximumCoverage: maxCoverage ?? prevFilter.maximumCoverage,
                types: insuranceType.length ? insuranceType : prevFilter.types || [],
            };
            onSearch(updatedFilter)
            return updatedFilter;
        });
    };

    const formatUSD = (amount: number): string => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: "30%",

        },
        {
            title: "Type",
            dataIndex: "typeLabel",
            width: "25%",
            key: "type",
        },
        {
            title: "Premium",
            dataIndex: "premium",
            width: "25%",
            key: "premium",

        },
        {
            title: "Coverage",
            dataIndex: "coverage",
            width: "25%",
            key: "coverage",
            render: (value: number) => formatUSD(value)

        }
    ]


    return (
        <>
            <div>
                <h1 className="mb-6">Insurance List</h1>
                <Card className="mb-2">
                    <Row justify="space-between" align="middle" className="flex-wrap">
                        <Col >
                            <InsuranceFilterForm
                                handleFilterChange={handleFilterChange}
                                setFilter={setFilter}
                            />
                        </Col>
                    </Row>
                </Card>
            </div>
            <div className="mt-4">
                <Card>
                    <Row justify="end" className="mb-4">
                        <p>
                            <Input
                                style={{ width: 300 }}
                                placeholder="Search text"
                                suffix={<SearchOutlined />}
                                onBlur={(e) => handleSearch(e.target.value)}
                            />

                        </p>
                    </Row>

                    <Table
                        key={insuranceList?.length}
                        columns={columns}
                        loading={loader}
                        dataSource={insuranceList ?? []}
                        // pagination={true}
                        className="mt-6 mb-6"
                    />

                </Card>


            </div>
        </>
    );

}

export default InsuranceList;


type TProps = {
    insuranceList: TInsuranceList | []
    onSearch: (filter: TInsuranceFilter) => void;
    loader: boolean
}