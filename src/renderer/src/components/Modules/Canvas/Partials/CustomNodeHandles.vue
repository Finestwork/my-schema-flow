<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
</script>
<template>
    <Handle id="source-top" type="source" :position="Position.Top" />
    <Handle id="source-bottom" type="source" :position="Position.Bottom" />
    <Handle id="source-right" type="source" :position="Position.Right" />
    <Handle id="source-left" type="source" :position="Position.Left" />

    <Handle id="target-top" type="target" :position="Position.Top" />
    <Handle id="target-bottom" type="target" :position="Position.Bottom" />
    <Handle id="target-right" type="target" :position="Position.Right" />
    <Handle id="target-left" type="target" :position="Position.Left" />
</template>
