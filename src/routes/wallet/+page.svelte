<script lang="ts">
    import { userStore, transactions } from '$lib/stores/mockdata';
    import { Wallet, ArrowUpRight, ArrowDownLeft, RefreshCw, Trophy } from 'lucide-svelte';

    let user = $state($userStore);
    userStore.subscribe(value => user = value);

    let swapAmount = $state(100);
    let swapDirection = $state('buy' as 'buy' | 'sell');

    const greenToRon = 0.43;

    let swapResult = $derived(swapDirection === 'buy'
        ? (swapAmount / greenToRon).toFixed(2)
        : (swapAmount * greenToRon).toFixed(2));

    function executeSwap() {
        alert(`Swap executed!\n\n${swapAmount} ${swapDirection === 'buy' ? 'RON' : 'GREEN'} → ${swapResult} ${swapDirection === 'buy' ? 'GREEN' : 'RON'}`);
    }

    let recentTx = transactions.slice(0, 15);
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <div>
        <h1 class="text-3xl font-bold mb-2">Wallet & Tokens</h1>
        <p class="text-muted-foreground">Manage your balances and transactions</p>
    </div>

    Balance Cards
    <section class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm opacity-90">GREEN Tokens</span>
                <Wallet class="h-5 w-5" />
            </div>
            <div class="text-4xl font-bold mb-1">{user.greenTokens.toFixed(1)}</div>
            <div class="text-sm opacity-90">≈ {(user.greenTokens * greenToRon).toFixed(2)} RON</div>
            <div class="mt-2 text-xs opacity-75">+2.5% today</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">RON Balance</span>
                <span class="text-lg">🇷🇴</span>
            </div>
            <div class="text-4xl font-bold mb-1">{user.ronBalance.toFixed(2)}</div>
            <div class="text-sm text-muted-foreground">Romanian Leu</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">EUR Balance</span>
                <span class="text-lg">🇪🇺</span>
            </div>
            <div class="text-4xl font-bold mb-1">{user.eurBalance.toFixed(2)}</div>
            <div class="text-sm text-muted-foreground">Euro</div>
        </div>
    </section>

    Swap Interface
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Buy/Sell GREEN Tokens</h2>
        <div class="max-w-md mx-auto space-y-4">
            <div class="p-4 bg-accent rounded-lg">
                <label class="block text-sm text-muted-foreground mb-2" for="swapAmount">You pay</label>
                <div class="flex items-center gap-2">
                    <input
                            id="swapAmount"
                            type="number"
                            bind:value={swapAmount}
                            class="flex-1 bg-transparent text-2xl font-bold outline-none"
                            placeholder="0.00"
                    />
                    <span class="text-lg font-semibold">{swapDirection === 'buy' ? 'RON' : 'GREEN'}</span>
                </div>
            </div>

            <div class="flex justify-center">
                <button
                        onclick={() => swapDirection = swapDirection === 'buy' ? 'sell' : 'buy'}
                        class="p-2 rounded-full bg-green-600 text-white hover:bg-green-700"
                >
                    <RefreshCw class="h-5 w-5" />
                </button>
            </div>

            <div class="p-4 bg-accent rounded-lg">
                <label class="block text-sm text-muted-foreground mb-2" for="swapResult">You receive</label>
                <div class="flex items-center gap-2">
                    <div class="flex-1 text-2xl font-bold">{swapResult}</div>
                    <span class="text-lg font-semibold">{swapDirection === 'buy' ? 'GREEN' : 'RON'}</span>
                </div>
            </div>

            <div class="text-sm text-center text-muted-foreground">
                1 GREEN = {greenToRon} RON
            </div>

            <button
                    onclick={executeSwap}
                    class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700"
            >
                Execute Swap
            </button>
        </div>
    </section>

    Transaction History
    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold">Transaction History</h2>
            <div class="flex gap-2">
                <button class="px-3 py-1 text-sm rounded-lg bg-accent">All</button>
                <button class="px-3 py-1 text-sm rounded-lg hover:bg-accent">Sent</button>
                <button class="px-3 py-1 text-sm rounded-lg hover:bg-accent">Received</button>
            </div>
        </div>

        <div class="space-y-3">
            {#each recentTx as tx}
                <div class="flex items-center gap-4 p-3 rounded-lg hover:bg-accent transition-colors">
                    <div class={`
            p-2 rounded-full
            ${Math.random() > 0.5 ? 'bg-green-100 dark:bg-green-900/30' : 'bg-red-100 dark:bg-red-900/30'}
          `}>
                        {#if Math.random() > 0.5}
                            <ArrowDownLeft class="h-4 w-4 text-green-600" />
                        {:else}
                            <ArrowUpRight class="h-4 w-4 text-red-600" />
                        {/if}
                    </div>

                    <div class="flex-1 min-w-0">
                        <div class="font-medium text-sm">{tx.seller}</div>
                        <div class="text-xs text-muted-foreground truncate">{tx.hash}</div>
                    </div>

                    <div class="text-right">
                        <div class="font-semibold">{(tx.quantity * tx.price).toFixed(2)} RON</div>
                        <div class="text-xs text-muted-foreground">
                            {new Date(tx.timestamp).toLocaleDateString('ro-RO')}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </section>

    NFT Certificates
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">NFT Energy Certificates</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div class="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-yellow-400 to-orange-500 p-6 text-white">
                <Trophy class="h-12 w-12 mb-3 opacity-90" />
                <h3 class="font-bold mb-1">100% Solar Powered</h3>
                <p class="text-sm opacity-90">June 2025</p>
                <div class="mt-2 text-xs opacity-75">Rare • Worth ~50 GREEN</div>
            </div>

            <div class="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-blue-400 to-cyan-500 p-6 text-white">
                <Trophy class="h-12 w-12 mb-3 opacity-90" />
                <h3 class="font-bold mb-1">Top 1% Prosumer</h3>
                <p class="text-sm opacity-90">Romania 2025</p>
                <div class="mt-2 text-xs opacity-75">Epic • Worth ~120 GREEN</div>
            </div>

            <div class="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-green-400 to-emerald-500 p-6 text-white">
                <Trophy class="h-12 w-12 mb-3 opacity-90" />
                <h3 class="font-bold mb-1">Carbon Neutral</h3>
                <p class="text-sm opacity-90">Champion</p>
                <div class="mt-2 text-xs opacity-75">Legendary • Worth ~250 GREEN</div>
            </div>
        </div>
    </section>

    Staking
    <section class="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl p-6">
        <h2 class="text-xl font-bold mb-2">Stake GREEN Tokens</h2>
        <p class="text-sm text-muted-foreground mb-4">Earn up to 10% APY by staking your tokens</p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="p-4 bg-background/50 rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">1 Month</div>
                <div class="text-2xl font-bold text-purple-600">6% APY</div>
            </div>
            <div class="p-4 bg-background/50 rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">6 Months</div>
                <div class="text-2xl font-bold text-purple-600">8% APY</div>
            </div>
            <div class="p-4 bg-background/50 rounded-lg">
                <div class="text-sm text-muted-foreground mb-1">1 Year</div>
                <div class="text-2xl font-bold text-purple-600">10% APY</div>
            </div>
        </div>
    </section>
</div>
