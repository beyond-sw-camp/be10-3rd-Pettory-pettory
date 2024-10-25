import {ref} from 'vue';
import axios from 'axios';
import {useAuthStore} from '@/stores/auth.js';

// 회원 정보를 가져오는 메소드
// 사이드 메뉴바에서 회원 이름, 이메일 가져오기 위해 작성
export function fetchUserInfo() {
    const authStore = useAuthStore();
    const userInfo = ref(null);

    const fetchUserInfoData = async () => {
        try {
            const token = authStore.accessToken;
            const response = await axios.get('http://localhost:8080/users/email', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            userInfo.value = response.data.result;
        } catch (error) {
            console.error('사용자 정보 가져오기 실패', error);
        }
    };
    return {userInfo, fetchUserInfoData};
}