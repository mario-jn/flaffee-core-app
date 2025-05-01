export interface HealthCheckResult {
    status: "healthy" | "unhealthy";
    timestamp: string;
    checks: {
        database: boolean;
    }
}