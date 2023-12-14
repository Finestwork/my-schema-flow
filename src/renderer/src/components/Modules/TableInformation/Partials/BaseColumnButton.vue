<template>
    <button
        class="group flex w-full rounded px-2 py-2 font-neon-mono text-[.6rem] font-semibold outline-none dark:bg-dark-800/80 dark:hover:bg-cyan-950/50 dark:focus:bg-cyan-950/50"
        type="button"
    >
        <span
            class="w-full max-w-[100px] flex-grow truncate text-left dark:text-slate-400 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
        >
            <slot name="column"></slot>
        </span>
        <span
            class="w-full flex-grow dark:text-slate-600 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
        >
            <slot name="type"></slot>
        </span>
        <span class="w-full flex-grow dark:text-cyan-500">
            <slot name="keyConstraint"></slot>
        </span>
    </button>
</template>
