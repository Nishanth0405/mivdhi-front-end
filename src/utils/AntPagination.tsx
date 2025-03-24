import { Pagination, PaginationProps } from "antd"
import { TInsuranceFilter, TInsuranceList } from "../common/insurance.type"

const AntPagination = ({
    handleFilterChange,
    filter,
    setFilter,
    insuranceList,
    totalCount,
    countOptions = [25, 50, 100],
    ...rest
}: Props) => {

    return (
        <div className="w-full flex justify-end mt-2">
            <Pagination
                showSizeChanger
                pageSizeOptions={countOptions}
                current={filter.page}
                onChange={(page: number, count) => handleFilterChange(page, count )}
                total={totalCount}
                pageSize={filter.count}
                showTotal={(total, range) =>
                    range[1] ? `${range[0]}-${range[1]} of ${total} records` : "No records"
                }
                {...rest}
            />
        </div>
    )
}

export default AntPagination

type Props = PaginationProps & {
    totalCount: number
    isLoading?: boolean
    countOptions?: number[]
    filter: TInsuranceFilter
    setFilter: React.Dispatch<
        React.SetStateAction<TInsuranceFilter>
    >
    handleFilterChange: (page: number, count: number) => void;
    insuranceList: TInsuranceList | []
}