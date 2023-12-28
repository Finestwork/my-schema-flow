# Welcome to Our Project
Thank you for considering contributing to this repository. Every contribution matters and I value your effort to improve the MySchemaFlow.

# Ground Rules
- Please make sure that you already read the [code of conduct](https://github.com/Finestwork/my-schema-flow/blob/dev/CODE_OF_CONDUCT.md).
- Create issues for any major changes and enhancements that you wish to make. Discuss things transparently and get community feedback.
- Ensure cross-platform compatibility for every change that's accepted. Windows, Mac, and Linux..

# How To Contribute
- Check the [existing issues](https://github.com/Finestwork/my-schema-flow/issues) first. If your issue isn't covered, don't hesitate to [create a new one](https://github.com/Finestwork/my-schema-flow/issues/new).
- Fork the repository on GitHub:
   - Clone the forked repository to your local machine.
   - **Important**: Create a new branch, specifically for the issue you are currently working.
   - Install dependencies.
   - Run the project locally.
- Submitting changes
   - **Important**: Before you commit your work, please run `npm run lint` and `npm run typecheck` to ensure that your code follows the coding standard. 
   - Commit your work and push it to your forked repository. 
   - Submit a pull request and should contain:
     - Screenshots or short videos are highly appreciated as they help the community to visualize the changes.
   - Please note that after two weeks I may close the pull request if it isn't showing any activity.

# Component Directories
Component directories should be named in plural form using PascalCase. Additionally, they consist of three main directories:

```
├── Base/
│   └── ComponentType/
│       └── VButton.vue
├── Modules/
│   ├── ModuleName/
│   │   └── Edit.vue
│   └── ModuleName/
│       ├── Partials
│       └── ModuleName.vue
└── Shared/
    └── ComponentType/
        └── AddIcon.vue
```
##### **Base directory**
Base components are universally used components identified by a 'V' prefix, indicating their foundational nature. How can you identify a base component? If the template includes `<slot></slot>`, it qualifies as a base component. The concept is to establish a basic style and functionalities without finalizing the content. Refer to the example below:

```
└── Base/
    ├── Modals/
    │   ├── VSlideModal.vue
    │   └── VFadedModal.vue
    └── Buttons/
        ├── VActionButton.vue
        └── VDefaultButton.vue
```

##### **Shared directory**
Unlike base components, shared components come with predefined HTML content and don't require a slot; they're simply reused across the application. How can you recognize a shared component? It doesn't have the `<slot></slot>` tag, and all its styles, functionalities, and content are finalized. They don't need the 'V' prefix.

```
└── Shared/
    ├── Icons/
    │   ├── SlideModal.vue
    │   └── FadedModal.vue
    └── Buttons/
        ├── SubmitButton.vue
        └── GoBackButton.vue
```


##### **Module directory**
Module directory contains the primary components essential for the application. Occasionally, if these main components become too extensive, you might create a Partials directory to divide them into multiple logical components.

```
└── Modules/
    ├── HistorySection/
    │   └── HistorySection.vue
    └── Toolbar/
        ├── Partials/
        │   ├── AddNewTableButton.vue
        │   ├── AutoLayoutButton.vue
        │   └── ...
        └── Toolbar.vue
```



# Coding Standards
I use ESLint and Prettier to lint and format our code, ensuring a consistent approach to how we write it. So make sure that before you commit your work you should run `npm run lint` and `npm run typecheck`.

# Vue
 ## Importing a file
 Usually the order of how I import my file is this:

 ```ts
// Base component directory
// Shared component directory
// Local component directory
// Stores
// Composables
// Utilities
// Symbols
// NPM package
// Types
```

For example, in `EditForm.vue` file:
```ts
import VPanelActionButton from '@components/Base/Buttons/VPanelActionButton.vue';
import VAlertList from '@components/Base/Alerts/VAlertList.vue';
import VAlert from '@components/Base/Alerts/VAlert.vue';
import EditIcon from '@components/Shared/Icons/EditIcon.vue';
import PanelBackButton from '@components/Shared/Buttons/PanelBackButton.vue';
import PanelFormColumnName from '@components/Shared/Forms/PanelFormColumnName.vue';
import PanelFormColumnType from '@components/Shared/Forms/PanelFormColumnType.vue';
import PanelFormColumnLength from '@components/Shared/Forms/PanelFormColumnLength.vue';
import PanelFormKeyConstraints from '@components/Shared/Forms/PanelFormKeyConstraints.vue';
import PanelFormNull from '@components/Shared/Forms/PanelFormNull.vue';
import { useCanvasStore } from '@stores/Canvas';
import { useUpdateEdgeData } from '@composables/Edges/useUpdateEdgeData';
import { validateColumns } from '@utilities/FormTableHelper';
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import type { TUpdateColumn } from '@composables/Table/useTableRelationActions';
```


## Composition API
The order should be something like this:

```ts
// 1. defineEmits, defineProps, defineModels
// 2. reactive, refs, inject, computed properties
// 3. composables, function expression
// 4. function calls, provide, vuejs lifecycle hooks, watchers
```


