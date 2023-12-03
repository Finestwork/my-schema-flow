<script setup lang="ts">
import { Handle, Position } from '@vue-flow/core';
</script>
<template>
    <Handle type="source" id="source-top" :position="Position.Top" />
    <Handle type="source" id="source-bottom" :position="Position.Bottom" />
    <Handle type="source" id="source-right" :position="Position.Right" />
    <Handle type="source" id="source-left" :position="Position.Left" />

    <Handle type="target" id="target-top" :position="Position.Top" />
    <Handle type="target" id="target-bottom" :position="Position.Bottom" />
    <Handle type="target" id="target-right" :position="Position.Right" />
    <Handle type="target" id="target-left" :position="Position.Left" />
</template>
