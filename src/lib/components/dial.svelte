<script>
    import { SpeedDial, Listgroup, ListgroupItem } from 'flowbite-svelte'
</script>

<SpeedDial defaultClass="fixed right-2 top-2 md:bottom-12" trigger="click" tooltip="none" pill={false} placement="bottom">
    <span slot="icon" class="material-symbols-rounded">
        group
    </span>
    <Listgroup class="divide-none" active>
        <a href="https://www.acucode.cloud/" target="_blank" rel="noreferrer">
            <ListgroupItem class="flex gap-2 md:px-5">
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M7 9a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V9z"></path><path d="M5 3a2 2 0 00-2 2v6a2 2 0 002 2V5h8a2 2 0 00-2-2H5z"></path></svg>
                Portfolio
            </ListgroupItem>
        </a>
        <a href="https://www.linkedin.com/in/agustin-dell-aquila-a5b2451b2/" target="_blank" rel="noreferrer">
            <ListgroupItem class="flex gap-2 md:px-5">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=512&id=13930&format=png" alt="Linked In"/>
                LinkedIn
            </ListgroupItem>
        </a>
        <a href="https://github.com/agusdellaquila" target="_blank" rel="noreferrer">
            <ListgroupItem class="flex gap-2 md:px-5">
                <img class="w-5 h-5" src="https://img.icons8.com/?size=512&id=fmFqQmR0UdsR&format=png" alt="Github"/>
                Github
            </ListgroupItem>
        </a>
    </Listgroup>
</SpeedDial>