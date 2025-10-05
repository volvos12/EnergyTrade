<script lang="ts">
    import { marketStats, transactions, prosumers } from '$lib/stores/mockdata';
    import { TrendingUp, Users, Zap, Leaf, ArrowRight } from 'lucide-svelte';
    import { onMount } from 'svelte';

    let stats = $state($marketStats);
    let recentTx = $state(transactions.slice(0, 10));
    let activeProsumers = $state(prosumers.slice(0, 8));

    onMount(() => {
        const interval = setInterval(() => {
            marketStats.update(s => ({
                ...s,
                totalEnergyToday: s.totalEnergyToday + Math.floor(Math.random() * 10),
                currentAvgPrice: +(s.currentAvgPrice + (Math.random() - 0.5) * 0.01).toFixed(2)
            }));
        }, 5000);

        return () => clearInterval(interval);
    });

    marketStats.subscribe(value => stats = value);
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <section class="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-500 via-emerald-600 to-teal-700 p-8 md:p-12 text-white">
        <div class="relative z-10 max-w-3xl">
            <h1 class="text-4xl md:text-5xl font-bold mb-4 text-balance">
                Trade Renewable Energy Directly
            </h1>
            <p class="text-lg md:text-xl mb-6 text-green-50 text-pretty">
                Join Romania's first peer-to-peer energy marketplace. Buy clean energy from local prosumers or sell your surplus at the best prices.
            </p>
            <div class="flex flex-wrap gap-4">
                <a href="/marketplace" class="inline-flex items-center gap-2 bg-white text-green-700 px-6 py-3 rounded-full font-semibold hover:bg-green-50 transition-colors">
                    Start Trading
                    <ArrowRight class="h-5 w-5" />
                </a>
                <a href="/prosumer" class="inline-flex items-center gap-2 bg-green-600/50 backdrop-blur px-6 py-3 rounded-full font-semibold hover:bg-green-600/70 transition-colors">
                    Become a Prosumer
                </a>
            </div>
        </div>

        <div class="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
    </section>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Energy Traded Today</span>
                <Zap class="h-5 w-5 text-yellow-500" />
            </div>
            <div class="text-3xl font-bold">{stats.totalEnergyToday.toLocaleString()}</div>
            <div class="text-sm text-muted-foreground">kWh</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Active Prosumers</span>
                <Users class="h-5 w-5 text-green-500" />
            </div>
            <div class="text-3xl font-bold flex items-center gap-2">
                {stats.activeProsumers}
                <span class="inline-block h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
            </div>
            <div class="text-sm text-muted-foreground">Online now</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Avg Market Price</span>
                <TrendingUp class="h-5 w-5 text-blue-500" />
            </div>
            <div class="text-3xl font-bold">{stats.currentAvgPrice.toFixed(2)}</div>
            <div class="text-sm text-green-600">+{stats.priceChange}% today</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">CO₂ Saved</span>
                <Leaf class="h-5 w-5 text-emerald-500" />
            </div>
            <div class="text-3xl font-bold">{stats.co2Saved.toLocaleString()}</div>
            <div class="text-sm text-muted-foreground">kg (~{Math.floor(stats.co2Saved / 21)} trees)</div>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-2xl font-bold mb-4">Live Market Feed</h2>
        <div class="space-y-3 max-h-96 overflow-y-auto">
            {#each recentTx as tx}
                <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div class={`
            h-2 w-2 rounded-full
            ${tx.energyType === 'Solar' ? 'bg-yellow-500' : ''}
            ${tx.energyType === 'Wind' ? 'bg-blue-500' : ''}
            ${tx.energyType === 'Hydro' ? 'bg-cyan-500' : ''}
            ${tx.energyType === 'Mixed' ? 'bg-green-500' : ''}
          `}></div>
                    <div class="flex-1 min-w-0">
                        <p class="text-sm">
                            <span class="font-semibold">{tx.seller}</span>
                            <span class="text-muted-foreground"> ({tx.sellerLocation}) sold </span>
                            <span class="font-semibold">{tx.quantity} kWh</span>
                            <span class="text-muted-foreground"> @ </span>
                            <span class="font-semibold">{tx.price} RON</span>
                        </p>
                    </div>
                    <span class="text-xs text-muted-foreground whitespace-nowrap">
            {new Date(tx.timestamp).toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit' })}
          </span>
                </div>
            {/each}
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-bold">Active Prosumers</h2>
            <a href="/marketplace" class="text-sm text-green-600 hover:underline">View all →</a>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {#each activeProsumers as prosumer}
                <a href="/marketplace?seller={prosumer.id}" class="group block p-4 rounded-lg border hover:border-green-500 hover:shadow-lg transition-all">
                    <div class="flex items-center gap-3 mb-3">
                        <img src={prosumer.avatar || "/placeholder.svg"} alt={prosumer.name} class="h-10 w-10 rounded-full" />
                        <div class="flex-1 min-w-0">
                            <div class="font-semibold truncate">{prosumer.name}</div>
                            <div class="text-xs text-muted-foreground">{prosumer.location}</div>
                        </div>
                    </div>
                    <div class="space-y-1 text-sm">
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Available:</span>
                            <span class="font-semibold">{prosumer.availableKwh} kWh</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-muted-foreground">Price:</span>
                            <span class="font-semibold text-green-600">{prosumer.pricePerKwh} RON</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-muted-foreground">Rating:</span>
                            <span class="flex items-center gap-1">
                <span class="text-yellow-500">★</span>
                <span class="font-semibold">{prosumer.reputation}</span>
              </span>
                        </div>
                    </div>
                </a>
            {/each}
        </div>
    </section>
</div>
