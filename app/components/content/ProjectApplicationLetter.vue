<script setup>
import { TiptapTextAlign } from '~/composables/tiptapExt';


const editor = useEditor({
  content: "<p>Resume Is Write Here!</p>",
  extensions: [TiptapStarterKit, TiptapUnderline, TiptapTextAlign.configure({types: ['heading', 'paragraph']})],
});

onBeforeUnmount(() => {
  unref(editor).destroy();
});

const toggleBold = () => editor.value.chain().focus().toggleBold().run();
const toggleItalic = () => editor.value.chain().focus().toggleBold().run();
const toggleUnderline = () => editor.value.chain().focus().toggleUnderline().run();
const toggleParagraph = () => editor.value.chain().focus().setParagraph().run();
const toggleTitle = () => editor.value.chain().focus().toggleHeading({level: 2}).run();
const toggleBulletList = () => editor.value.chain().focus().toggleBulletList().run();
const toggleOrderList = () => editor.value.chain().focus().toggleOrderedList().run();
const toggleLeft = () => editor.value.chain().focus().setTextAlign("left").run();
const toggleCenter = () => editor.value.chain().focus().setTextAlign("center").run();
const toggleRight = () => editor.value.chain().focus().setTextAlign("right").run();
const toggleJustify = () => editor.value.chain().focus().setTextAlign("justify").run();
const toggleUndo = () => editor.value.chain().focus().undo().run();
const toggleRedo = () => editor.value.chain().focus().redo().run();
</script>

<template>
  <div class="border p-2 rounded-xl" id="write">
    <div v-if="editor" :class="['flex gap-2 mb-3 overflow-x-auto', 
        '[&_button]:border [&_button]:aspect-square [&_button]:h-7 [&_button]:rounded']">
      
        <button @click="toggleBold">
            <span class="font-extrabold">B</span>
        </button>

        <button @click="toggleItalic">
            <span class="font-bold italic">i</span>
        </button>

        <button @click="toggleUnderline">
            <span class="font-bold underline">U</span>
        </button>

        <button @click="toggleTitle">
            <span class="font-bold">H</span>
        </button>

        <button @click="toggleParagraph">
            <span class="font-bold">P</span>
        </button>

        <button @click="toggleBulletList" class="flex items-center justify-center">
            <Icon name="uil:list-ul" class="size-5"/>
        </button>

        <button @click="toggleOrderList" class="flex items-center justify-center">
            <Icon name="uil:list-ol" class="size-5"/>
        </button>

        <button @click="toggleLeft" class="flex items-center justify-center">
            <Icon name="uil:align-left" class="size-5"/>
        </button>
        <button @click="toggleCenter" class="flex items-center justify-center">
            <Icon name="uil:align-center" class="size-5"/>
        </button>
        <button @click="toggleRight" class="flex items-center justify-center">
            <Icon name="uil:align-right" class="size-5"/>
        </button>

        <button @click="toggleJustify" class="flex items-center justify-center">
            <Icon name="uil:align-justify" class="size-5"/>
        </button>

        <button @click="toggleUndo" class="flex items-center justify-center">
            <Icon name="solar:undo-left-round-outline" class="size-5"/>
        </button>

        <button @click="toggleRedo" class="flex items-center justify-center">
            <Icon name="solar:undo-left-round-outline" class="size-5 scale-x-[-1]"/>
        </button>

    </div>
    <TiptapEditorContent :editor="editor" class="border p-2"/>
  </div>
</template>