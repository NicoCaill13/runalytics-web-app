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
};

type ProviderAccount = {
    isActive: boolean
    providerUserId: string
    provider: Provider
}

export type Unit = "METRIC" | "IMPERIAL";
export type HeartUnit = "HRR" | "FC_MAX";

export type Gender = "MALE" | "FEMALE" | "OTHER";

export type Provider = "STRAVA" | "GOOGLE_HEALTH" | "GARMIN" | "APPLE_HEALTH";