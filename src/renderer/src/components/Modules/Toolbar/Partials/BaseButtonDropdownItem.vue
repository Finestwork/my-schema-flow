<template>
    <button
        class="group flex w-full items-center px-1.5 py-2 outline-none hover:dark:bg-cyan-950/50 focus:dark:bg-cyan-950/50"
        type="button"
    >
        <span
            class="mr-2 block w-[12px] dark:stroke-slate-300 group-hover:dark:stroke-cyan-500 group-focus:dark:stroke-cyan-500"
        >
            <slot name="icon"></slot>
        </span>
        <span
            class="text-[.6rem] dark:text-slate-300 group-hover:dark:text-cyan-500 group-focus:dark:text-cyan-500"
        >
            <slot name="text"></slot>
        </span>
    </button>
</template>
