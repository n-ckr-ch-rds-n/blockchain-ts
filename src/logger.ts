import chalk from "chalk";

export class Logger {
    logError(err: string): void {
        console.log(chalk.underline.red(err));
    }

    logSuccess(message: string): void {
        console.log(chalk.underline.green(message));
    }

    logHash(hash: string): void {
        console.log(chalk.yellow(hash));
    }
}
