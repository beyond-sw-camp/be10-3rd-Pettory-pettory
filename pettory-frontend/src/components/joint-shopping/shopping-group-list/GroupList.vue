<script setup>
import {computed, ref} from "vue";
import ModalSmall from "@/components/common/ModalSmall.vue";
import GroupItem from "@/components/joint-shopping/shopping-group-list/GroupItem.vue";
import GroupDetailModal from "@/components/joint-shopping/modal/GroupDetailModal.vue";

const props = defineProps({
  groups: {
    type: Array,
    required: true
  },
  bookmarks: {
    type: Array,
    required: true
  },
  participationGroups: {
    type: Array,
    required: true
  },
  range:{
    type: String,
    required: true
  }
});

// emit 정의
const emit = defineEmits(['check', 'join']);

// 부모 컴포넌트로 검색 이벤트 전달
const emitCheck = (groupNum, isActive, newBookmarks) => {
  emit('check', groupNum, isActive, newBookmarks);
};

// 배열이 비어 있는지 확인하는 computed 속성
const isEmptyArray = computed(() => props.groups.length === 0);


// 선택한 그룹의 정보 모달창 띄움 / 이미 참가했다면 바로 모임방으로 이동
const isModalVisible = ref(false);
const isFailModalVisible = ref(false);
const selectedGroup = ref(null);
const isParticipationGroup = ref(false);
const groupInfo = (group) => {
  if ( props.range === 'participation' || props.range === 'bookmark'){
    isParticipationGroup.value = true;
    emit('join',group.jointShoppingGroupNum, isParticipationGroup.value );
  }
  else if ( props.range === 'entire'){
    selectedGroup.value = group;
    isModalVisible.value = true;
  }
}

// 뒤로가기로 나가기
const closeModal = () => {
  isModalVisible.value = false;
}

// 뒤로가기로 나가기
const closeFailModal = () => {
  isFailModalVisible.value = false;
  isModalVisible.value = false;
}

// 그룹을 참가하며 페이지 이동 / 이미 참가한 방의 경우 참가 안됨
const goToGroup = (id) => {
  if ( props.participationGroups.includes(id) ){
    isFailModalVisible.value = true;
  }else {
    isParticipationGroup.value = false;
    emit('join',id, isParticipationGroup.value);
  }
}

</script>

<template>
  <div class="container">
    <div v-if="isEmptyArray" class="no-group-card">
      <p>
        {{ range === 'entire' ? '모임방이 없습니다.' : (range === 'participation' ? '참가하신 모임방이 없습니다.' : '즐겨찾기된 모임방이 없습니다.') }}
      </p>
    </div>
    <template v-else>
      <GroupItem v-for="group in groups" :key="group.jointShoppingGroupNum" :group="group" :bookmarks="bookmarks"
                 :range="range" @info="groupInfo(group)" @check="emitCheck"/>
    </template>

    <GroupDetailModal :group="selectedGroup" :isVisible="isModalVisible" :bookmarks="bookmarks" :range="range"
                      @join="goToGroup(selectedGroup.jointShoppingGroupNum)" @close="closeModal" />

    <ModalSmall :isVisible="isFailModalVisible" :message="'이미 참가하여 재참가하실 수 없습니다.'"
                @confirm="closeFailModal" @close="closeFailModal"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.no-group-card {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
}
</style>