<template>
    <div class="fixed left-0 top-[48px] h-[calc(100vh-44px)] w-full">
        <div class="relative flex h-full w-full items-center justify-center">
            <span
                class="absolute -z-[1] block h-full w-full bg-transparent bg-opacity-[0.06] backdrop-blur-[8.5px]"
            >
            </span>

            <slot></slot>
        </div>
    </div>
</template>
