<script lang="ts">
    import { prosumers } from '$lib/stores/mockdata';
    import { Users, Target } from 'lucide-svelte';

    let topProsumers = $state(prosumers.slice(0, 10).sort((a, b) => b.totalSales - a.totalSales));
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <div>
        <h1 class="text-3xl font-bold mb-2">Community</h1>
        <p class="text-muted-foreground">Connect with other energy traders</p>
    </div>

    Leaderboard
    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Top Prosumers</h2>
            <div class="flex gap-2">
                <button class="px-3 py-1 text-sm rounded-lg bg-accent">This Month</button>
                <button class="px-3 py-1 text-sm rounded-lg hover:bg-accent">All Time</button>
            </div>
        </div>

        <div class="space-y-3">
            {#each topProsumers as prosumer, i}
                <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div class={`
            flex items-center justify-center w-8 h-8 rounded-full font-bold
            ${i === 0 ? 'bg-yellow-500 text-white' : ''}
            ${i === 1 ? 'bg-gray-400 text-white' : ''}
            ${i === 2 ? 'bg-orange-600 text-white' : ''}
            ${i > 2 ? 'bg-accent text-muted-foreground' : ''}
          `}>
                        {i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : i + 1}
                    </div>

                    <img src={prosumer.avatar || "/placeholder.svg"} alt={prosumer.name} class="h-10 w-10 rounded-full" />

                    <div class="flex-1 min-w-0">
                        <div class="font-semibold">{prosumer.name}</div>
                        <div class="text-sm text-muted-foreground">{prosumer.location}</div>
                    </div>

                    <div class="text-right">
                        <div class="font-bold text-green-600">{prosumer.totalSales} kWh</div>
                        <div class="text-xs text-muted-foreground">sold this month</div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Active Challenges</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 border rounded-lg">
                <div class="flex items-center gap-2 mb-3">
                    <Target class="h-5 w-5 text-yellow-500" />
                    <h3 class="font-semibold">Solar September</h3>
                </div>
                <p class="text-sm text-muted-foreground mb-3">Produce 500 kWh from solar</p>
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span class="font-semibold">335 / 500 kWh</span>
                    </div>
                    <div class="h-2 bg-accent rounded-full overflow-hidden">
                        <div class="h-full bg-yellow-500" style="width: 67%"></div>
                    </div>
                </div>
                <div class="text-xs text-muted-foreground">Reward: 50 GREEN + NFT Badge</div>
            </div>

            <div class="p-4 border rounded-lg">
                <div class="flex items-center gap-2 mb-3">
                    <Users class="h-5 w-5 text-blue-500" />
                    <h3 class="font-semibold">Social Trader</h3>
                </div>
                <p class="text-sm text-muted-foreground mb-3">Trade with 10 different people</p>
                <div class="mb-2">
                    <div class="flex justify-between text-sm mb-1">
                        <span>Progress</span>
                        <span class="font-semibold">8 / 10 traders</span>
                    </div>
                    <div class="h-2 bg-accent rounded-full overflow-hidden">
                        <div class="h-full bg-blue-500" style="width: 80%"></div>
                    </div>
                </div>
                <div class="text-xs text-muted-foreground">Reward: 30 GREEN</div>
            </div>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Community Feed</h2>
        <div class="space-y-4">
            <div class="flex gap-3 p-3 rounded-lg hover:bg-accent">
                <img src={prosumers[0].avatar || "/placeholder.svg"} alt="" class="h-10 w-10 rounded-full" />
                <div class="flex-1">
                    <div class="font-semibold text-sm">{prosumers[0].name}</div>
                    <p class="text-sm text-muted-foreground mt-1">
                        Just produced my 1000th kWh! 🎉 Thanks to everyone who's been buying from me!
                    </p>
                    <div class="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <button class="hover:text-foreground">❤️ 24</button>
                        <button class="hover:text-foreground">💬 5</button>
                        <span>2 hours ago</span>
                    </div>
                </div>
            </div>

            <div class="flex gap-3 p-3 rounded-lg hover:bg-accent">
                <img src={prosumers[1].avatar || "/placeholder.svg"} alt="" class="h-10 w-10 rounded-full" />
                <div class="flex-1">
                    <div class="font-semibold text-sm">{prosumers[1].name}</div>
                    <p class="text-sm text-muted-foreground mt-1">
                        Pro tip: Sell your surplus between 18:00-20:00 for best prices! 💡
                    </p>
                    <div class="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                        <button class="hover:text-foreground">❤️ 42</button>
                        <button class="hover:text-foreground">💬 12</button>
                        <span>5 hours ago</span>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
