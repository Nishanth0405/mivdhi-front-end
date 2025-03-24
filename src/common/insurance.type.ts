export type InsuranceInfo = {
   name: string,
   premium: number,
   coverage: number,
   type: string,
   typeLabel: string
}

export type TInsuranceList = InsuranceInfo[]

export type TInsuranceFilter = {
   page?: number,
   searchTerm?: string,
   sortOrder?: string,
   count?: number,
   minimumPremium?: number,
   maximumPremium?: number,
   minimumCoverage?: number,
   maximumCoverage?: number,
   types?: string[]
}

export type TUserInfo = {
   userName: string
   password: string
}