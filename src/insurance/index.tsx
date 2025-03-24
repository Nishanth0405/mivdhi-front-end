import { Card } from "antd"
import { useEffect, useState } from "react";
import { getInsuranceListAPI, getInsuranceListFilter } from "../api/api";
import { TInsuranceFilter, TInsuranceList } from "../common/insurance.type";
import InsuranceList from "./InsuranceList";


const Insurance = () => {
    const [insuranceList, setInsuranceList] = useState<TInsuranceList>([])

    const [loader, setIsLoader] = useState<boolean>(false)


    useEffect(() => {
        const fetchInsuranceData = async () => {
            setIsLoader(true); // Set loader to true before API call
            try {
                const insuranceData = await getInsuranceListAPI();
                if (insuranceData) {
                    setInsuranceList(insuranceData);
                }
            } catch (error) {
                console.error("Error fetching insurance data:", error);
            } finally {
                setIsLoader(false); 
            }
        };
    
        fetchInsuranceData();
    }, []);



    const handleSearch = async (filter: TInsuranceFilter) => {
        const filteredData = await getInsuranceListFilter(filter)
        setInsuranceList(filteredData)

    };

    return (
        <>
            <div className="mt-4">
                <Card>
                    <InsuranceList
                        loader={loader}
                        insuranceList={insuranceList}
                        onSearch={handleSearch}
                    />
                </Card>
            </div>
        </>


    )
}

export default Insurance;