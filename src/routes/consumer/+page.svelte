<script lang="ts">
    import { userStore, transactions } from '$lib/stores/mockdata';
    import { TrendingDown, Zap, DollarSign, Leaf } from 'lucide-svelte';

    let user = $state($userStore);
    userStore.subscribe(value => user = value);

    let monthConsumption = $state(342);
    let monthSpending = $state(147.50);
    let gridEquivalent = $state(178.40);
    let co2Saved = $state(228);

    let myTransactions = $state(transactions.slice(0, 10));
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <div>
        <h1 class="text-3xl font-bold mb-2">My Consumer Panel</h1>
        <p class="text-muted-foreground">Track your energy purchases and savings</p>
    </div>

    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Monthly Consumption</span>
                <Zap class="h-5 w-5 text-yellow-500" />
            </div>
            <div class="text-3xl font-bold">{monthConsumption}</div>
            <div class="text-sm text-muted-foreground">kWh this month</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Total Spending</span>
                <DollarSign class="h-5 w-5 text-blue-500" />
            </div>
            <div class="text-3xl font-bold">{monthSpending.toFixed(2)}</div>
            <div class="text-sm text-muted-foreground">RON</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">Savings vs Grid</span>
                <TrendingDown class="h-5 w-5 text-green-500" />
            </div>
            <div class="text-3xl font-bold text-green-600">{(gridEquivalent - monthSpending).toFixed(2)}</div>
            <div class="text-sm text-muted-foreground">RON saved ({Math.round((1 - monthSpending/gridEquivalent) * 100)}%)</div>
        </div>

        <div class="bg-card border rounded-xl p-6">
            <div class="flex items-center justify-between mb-2">
                <span class="text-sm text-muted-foreground">CO₂ Saved</span>
                <Leaf class="h-5 w-5 text-emerald-500" />
            </div>
            <div class="text-3xl font-bold">{co2Saved}</div>
            <div class="text-sm text-muted-foreground">kg (~{Math.floor(co2Saved / 21)} trees)</div>
        </div>
    </section>
    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Purchase History</h2>
        <div class="overflow-x-auto">
            <table class="w-full">
                <thead>
                <tr class="border-b text-left text-sm text-muted-foreground">
                    <th class="pb-3 font-medium">Date</th>
                    <th class="pb-3 font-medium">Seller</th>
                    <th class="pb-3 font-medium">Quantity</th>
                    <th class="pb-3 font-medium">Price</th>
                    <th class="pb-3 font-medium">Total</th>
                    <th class="pb-3 font-medium">Source</th>
                    <th class="pb-3 font-medium">Status</th>
                </tr>
                </thead>
                <tbody>
                {#each myTransactions as tx}
                    <tr class="border-b last:border-0 hover:bg-accent">
                        <td class="py-3 text-sm">
                            {new Date(tx.timestamp).toLocaleDateString('ro-RO')}
                        </td>
                        <td class="py-3 text-sm font-medium">{tx.seller}</td>
                        <td class="py-3 text-sm">{tx.quantity} kWh</td>
                        <td class="py-3 text-sm">{tx.price} RON</td>
                        <td class="py-3 text-sm font-semibold">{(tx.quantity * tx.price).toFixed(2)} RON</td>
                        <td class="py-3">
                <span class={`
                  inline-flex items-center px-2 py-1 rounded-full text-xs font-medium
                  ${tx.energyType === 'Solar' ? 'bg-gray-100 text-yellow-700  dark:text-yellow-400' : ''}
                  ${tx.energyType === 'Wind' ? 'bg-gray-100 text-blue-700  dark:text-blue-400' : ''}
                  ${tx.energyType === 'Hydro' ? 'bg-gray-100 text-cyan-700  dark:text-cyan-400' : ''}
                  ${tx.energyType === 'Mixed' ? 'bg-gray-100 text-green-700  dark:text-green-400' : ''}
                `}>
                  {tx.energyType}
                </span>
                        </td>
                        <td class="py-3">
                <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-green-700 dark:text-green-400">
                  Completed
                </span>
                        </td>
                    </tr>
                {/each}
                </tbody>
            </table>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <h2 class="text-xl font-bold mb-4">Consumption Analytics</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 class="font-semibold mb-3">Energy Source Breakdown</h3>
                <div class="space-y-2">
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Solar</span>
                            <span class="font-semibold">45%</span>
                        </div>
                        <div class="h-2 bg-accent rounded-full overflow-hidden">
                            <div class="h-full bg-yellow-500" style="width: 45%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Wind</span>
                            <span class="font-semibold">30%</span>
                        </div>
                        <div class="h-2 bg-accent rounded-full overflow-hidden">
                            <div class="h-full bg-blue-500" style="width: 30%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Hydro</span>
                            <span class="font-semibold">15%</span>
                        </div>
                        <div class="h-2 bg-accent rounded-full overflow-hidden">
                            <div class="h-full bg-cyan-500" style="width: 15%"></div>
                        </div>
                    </div>
                    <div>
                        <div class="flex justify-between text-sm mb-1">
                            <span>Mixed</span>
                            <span class="font-semibold">10%</span>
                        </div>
                        <div class="h-2 bg-accent rounded-full overflow-hidden">
                            <div class="h-full bg-green-500" style="width: 10%"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <h3 class="font-semibold mb-3">AI Recommendations</h3>
                <div class="space-y-3">
                    <div class="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div class="font-medium text-sm mb-1">💡 Shift Usage</div>
                        <p class="text-sm text-muted-foreground">
                            You could save 15% by shifting laundry to 14:00-16:00 when prices are lowest
                        </p>
                    </div>
                    <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div class="font-medium text-sm mb-1">🌱 Go Greener</div>
                        <p class="text-sm text-muted-foreground">
                            Switch to 100% solar energy for an extra 5% discount from select sellers
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
</div>
