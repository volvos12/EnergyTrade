<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { darkMode, userStore } from '$lib/stores/mockdata';
	import { Sun, Moon, Menu, X, Home, ShoppingCart, Zap, User, Wallet, Users, BarChart3, BookOpen } from 'lucide-svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();

	let sidebarOpen = $state(false);
	let isDark = $state(false);

	darkMode.subscribe(value => isDark = value);

	function toggleDarkMode() {
		darkMode.update(v => !v);
	}

	const navItems = [
		{ href: '/', icon: Home, label: 'Dashboard' },
		{ href: '/marketplace', icon: ShoppingCart, label: 'Marketplace' },
		{ href: '/prosumer', icon: Zap, label: 'My Prosumer' },
		{ href: '/consumer', icon: User, label: 'My Consumer' },
		{ href: '/wallet', icon: Wallet, label: 'Wallet' },
		{ href: '/community', icon: Users, label: 'Community' },
		{ href: '/analytics', icon: BarChart3, label: 'Analytics' },
	];

	let user = $state($userStore);
	userStore.subscribe(value => user = value);
</script>

<div class={isDark ? 'dark' : ''}>
	<div class="min-h-screen bg-background text-foreground">
		<header class="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div class="container flex h-16 items-center justify-between px-4">
				<div class="flex items-center gap-4">
					<button
							onclick={() => sidebarOpen = !sidebarOpen}
							class="lg:hidden"
							aria-label="Toggle menu"
					>
						{#if sidebarOpen}
							<X class="h-6 w-6" />
						{:else}
							<Menu class="h-6 w-6" />
						{/if}
					</button>

					<a href="/" class="flex items-center gap-2 font-bold text-xl">
						<div class="h-8 w-8 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
							<Zap class="h-5 w-5 text-white" />
						</div>
						<span class="hidden sm:inline">EnergyTrade</span>
					</a>
				</div>

				<div class="flex items-center gap-4">
					<div class="hidden md:flex items-center gap-2 text-sm">
						<span class="text-muted-foreground">GREEN:</span>
						<span class="font-semibold text-green-600">{user.greenTokens.toFixed(1)}</span>
					</div>

					<button
							onclick={toggleDarkMode}
							class="rounded-full p-2 hover:bg-accent"
							aria-label="Toggle dark mode"
					>
						{#if isDark}
							<Sun class="h-5 w-5" />
						{:else}
							<Moon class="h-5 w-5" />
						{/if}
					</button>

					<a href="/settings" class="flex items-center gap-2">
						<img src={user.avatar || "/placeholder.svg"} alt={user.name} class="h-8 w-8 rounded-full" />
					</a>
				</div>
			</div>
		</header>

		<div class="flex">
			<aside class={`
        fixed lg:sticky top-16 left-0 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background
        transition-transform duration-300 lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
				<nav class="flex flex-col gap-1 p-4">
					{#each navItems as item}
						<a
								href={item.href}
								class={`
                flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium
                transition-colors hover:bg-accent
                ${$page.url.pathname === item.href ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'}
              `}
								onclick={() => sidebarOpen = false}
						>
							<item.icon class="h-5 w-5" />
							{item.label}
						</a>
					{/each}
				</nav>
			</aside>
			{#if sidebarOpen}
				<div
						class="fixed inset-0 z-30 bg-black/50 lg:hidden"
						role="button"
						tabindex="0"
						aria-label="Close sidebar"
						onkeydown={(e) => { if (e.key === 'Enter' || e.key === ' ') sidebarOpen = false; }}
						onclick={() => sidebarOpen = false}
				></div>
			{/if}
			<main class="flex-1 overflow-x-hidden">
				{@render children?.()}
			</main>
		</div>
	</div>
</div>
