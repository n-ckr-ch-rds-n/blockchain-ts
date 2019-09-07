export class MockLogger {
    logError(err: string) {
        console.log("Pretending to log an error...");
    }

    logSuccess(message: string) {
        console.log("Pretending to log a success...");
    }

    logHash(hash: string) {
        console.log("Pretending to log a hash...");
    }
}
