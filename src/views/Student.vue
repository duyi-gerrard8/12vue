<template>
    <div class="student">
        <student-add></student-add>
        <hr/>
        <student-list></student-list>
    </div>
</template>

<script>
    import StudentAdd from '../components/StudentAdd';
    import StudentList from '@/components/StudentList';
    export default {
        name: "Student",
        components: {
            StudentAdd,
            StudentList,
        }
    }
</script>

<style scoped>

</style>
