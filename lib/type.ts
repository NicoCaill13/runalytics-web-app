export type UserProfile = {
    id?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    avatarUrl?: string;
    weight?: number;
    gender?: Gender
    birthDay?: string;
    measurementUnit?: Unit;
    heartUnit?: HeartUnit;
    providerAccounts?: ProviderAccount[]
    physioHistory?: Physio[]
};

type ProviderAccount = {
    isActive: boolean
    providerUserId: string
    provider: Provider
}

type Physio = {
    metric: MetricUnit
    value: number
    source: ValueSource
}

export type Unit = "METRIC" | "IMPERIAL";
export type ValueSource = "ESTIMATED" | "USER";
export type HeartUnit = "HRR" | "FC_MAX";
export type MetricUnit = "VMA" | "FC_REPOS" | "FC_MAX" | "FC_RESERVE" | "HRR_ZONES" | "VMA_ZONES"
export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Provider = "STRAVA" | "GOOGLE_HEALTH" | "GARMIN" | "APPLE_HEALTH";