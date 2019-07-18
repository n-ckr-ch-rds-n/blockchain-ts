import chalk from "chalk";

export class Logger {
    logError(err: string) {
        console.log(chalk.red(err))
    }

    logSuccess(message: string) {
        console.log(chalk.green(message));
    }
}
