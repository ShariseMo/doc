## Laravel-supervisor

> laravel 队列为不同的后台队列服务提供了统一的 API，例如：Beanstalk，Amazon SQS，Redis，甚至其他基于关系型数据库的队列。
> 队列的目的是将耗时的任务延时处理，比如：发送邮件，从而大幅度缩短 web 请求和响应的时间
> 队列配置文件：config/queue.php

## 定时任务调度

> cron 是 Unix，Solaris，Linux 下的一个十分有用的工具，通过 cron 脚本能使计划任务定期地在系统后台自动运行。
> 这种计划任务在 Unix，Solaris，Linux 下的术语为 Cron jobs。
> laravel 任务调度允许你流式而不失优雅地在 laravel

#### 定义调度

- 在 App\Console\Commands 目录下定义调度任务类，eg：StatisDaily.php【里面的 handle 方法是该任务要执行的动作】
- 在 App\Console\Kernel 类中的 schedule 方法中定义所有的调度任务
- 下面是你唯一需要添加到服务器的 Cron 条目，如果你不知道如何添加 Cron 条目到服务器，可以考虑使用诸如 Laravel Forge 这样的服务来为管理 Cron 条目： `* * * * * php /path-to-your-project/artisan schedule:run >> /dev/null 2>&1`
- php artisan schedule:run 执行任务
- 在命令行中执行对应命令执行任务，eg：php artisan statistic:daily 【可以通过 php artisan list 查看所有 artisna 命令】

```php
// App\Console\Kernel.php
<?php
namespace App\Console;

use App\Console\Commands\StatisticDaily;
use App\Console\Commands\StatisticWeekly;
use App\Console\Commands\StatisticMonthly;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        StatisticDaily::class,
        StatisticWeekly::class,
        StatisticMonthly::class,
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        // 测试用
         $schedule->command('statistic:daily')->everyMinute()->withoutOverlapping();
         $schedule->command('statistic:weekly')->everyMinute()->withoutOverlapping();
         $schedule->command('statistic:monthly')->everyMinute()->withoutOverlapping();

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');
        require base_path('routes/console.php');
    }
}
```
