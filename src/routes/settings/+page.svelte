<script lang="ts">
    import { userStore } from '$lib/stores/mockdata';
    import { User, Bell, Lock, Globe } from 'lucide-svelte';

    let user = $state($userStore);
    userStore.subscribe(value => user = value);

    let notifications = $state({
        transactions: true,
        priceAlerts: true,
        social: false,
        marketing: false
    });
</script>

<div class="container mx-auto px-4 py-8 space-y-8 max-w-4xl">
    <div>
        <h1 class="text-3xl font-bold mb-2">Settings</h1>
        <p class="text-muted-foreground">Manage your account and preferences</p>
    </div>

    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
            <User class="h-5 w-5" />
            <h2 class="text-xl font-bold">Personal Profile</h2>
        </div>

        <div class="flex items-center gap-4 mb-6">
            <img src={user.avatar || "/placeholder.svg"} alt={user.name} class="h-12 w-12 rounded-full" />
            <button class="px-4 py-2 rounded-lg border hover:bg-accent">
                Change Photo
            </button>
        </div>

        <div class="space-y-4">
            <div>
                <label for="displayName" class="block text-sm font-medium mb-2">Display Name</label>
                <input
                        id="displayName"
                        type="text"
                        value={user.name}
                        class="w-full px-4 py-2 rounded-lg border bg-background"
                />
            </div>

            <div>
                <label for="email" class="block text-sm font-medium mb-2">Email</label>
                <input
                        id="email"
                        type="email"
                        value={user.email}
                        class="w-full px-4 py-2 rounded-lg border bg-background"
                />
            </div>

            <div>
                <label for="location" class="block text-sm font-medium mb-2">Location</label>
                <select id="location" class="w-full px-4 py-2 rounded-lg border bg-background">
                    <option>{user.location}</option>
                    <option>Cluj-Napoca</option>
                    <option>Timișoara</option>
                    <option>Iași</option>
                </select>
            </div>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
            <Bell class="h-5 w-5" />
            <h2 class="text-xl font-bold">Notification Preferences</h2>
        </div>

        <div class="space-y-4">
            <div class="flex items-center justify-between">
                <div>
                    <div class="font-medium">Transaction Notifications</div>
                    <div class="text-sm text-muted-foreground">Purchase confirmations, sales completed</div>
                </div>
                <input type="checkbox" bind:checked={notifications.transactions} class="h-4 w-4" />
            </div>

            <div class="flex items-center justify-between">
                <div>
                    <div class="font-medium">Price Alerts</div>
                    <div class="text-sm text-muted-foreground">Market opportunities, threshold reached</div>
                </div>
                <input type="checkbox" bind:checked={notifications.priceAlerts} class="h-4 w-4" />
            </div>

            <div class="flex items-center justify-between">
                <div>
                    <div class="font-medium">Social Notifications</div>
                    <div class="text-sm text-muted-foreground">New followers, messages, mentions</div>
                </div>
                <input type="checkbox" bind:checked={notifications.social} class="h-4 w-4" />
            </div>

            <div class="flex items-center justify-between">
                <div>
                    <div class="font-medium">Marketing</div>
                    <div class="text-sm text-muted-foreground">Newsletter, platform updates</div>
                </div>
                <input type="checkbox" bind:checked={notifications.marketing} class="h-4 w-4" />
            </div>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
            <Lock class="h-5 w-5" />
            <h2 class="text-xl font-bold">Security</h2>
        </div>

        <div class="space-y-4">
            <div class="flex items-center justify-between p-3 bg-accent rounded-lg">
                <div>
                    <div class="font-medium">Two-Factor Authentication</div>
                    <div class="text-sm text-muted-foreground">Add an extra layer of security</div>
                </div>
                <button class="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700">
                    Enable
                </button>
            </div>

            <button class="w-full px-4 py-2 rounded-lg border hover:bg-accent text-left">
                Change Password
            </button>

            <button class="w-full px-4 py-2 rounded-lg border hover:bg-accent text-left">
                View Login History
            </button>
        </div>
    </section>

    <section class="bg-card border rounded-xl p-6">
        <div class="flex items-center gap-2 mb-4">
            <Globe class="h-5 w-5" />
            <h2 class="text-xl font-bold">Language & Region</h2>
        </div>

        <div class="space-y-4">
            <div>
                <label for="language" class="block text-sm font-medium mb-2">Language</label>
                <select id="language" class="w-full px-4 py-2 rounded-lg border bg-background">
                    <option>🇷🇴 Romanian</option>
                    <option>🇬🇧 English</option>
                </select>
            </div>

            <div>
                <label for="currency" class="block text-sm font-medium mb-2">Currency</label>
                <select id="currency" class="w-full px-4 py-2 rounded-lg border bg-background">
                    <option>RON (Romanian Leu)</option>
                    <option>EUR (Euro)</option>
                </select>
            </div>
        </div>
    </section>
    <section class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <h2 class="text-xl font-bold text-red-600 dark:text-red-400 mb-4">Danger Zone</h2>
        <div class="space-y-3">
            <button class="w-full px-4 py-2 rounded-lg border border-red-300 dark:border-red-700 hover:bg-red-100 dark:hover:bg-red-900/30 text-left">
                Download My Data
            </button>
            <button class="w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 text-left">
                Delete Account
            </button>
        </div>
    </section>
</div>
