export class MockLogger {
    logError(err: string) {
        console.log("foo");
    }

    logSuccess(message: string) {
        console.log("bar");
    }

    logHash(hash: string) {
        console.log("baz");
    }
}
