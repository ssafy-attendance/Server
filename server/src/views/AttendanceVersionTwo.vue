<template>
  <div class="input-container">
    <div class="user-input">
      <label for="class" class="user-input-label">지역</label>
      <input
        type="text"
        id="class"
        class="user-input-value"
        v-model="userInput.campus"
        placeholder="예) 서울"
      />
    </div>

    <div class="user-input">
      <label for="class" class="user-input-label">반</label>
      <input
        type="number"
        id="class"
        class="user-input-value"
        v-model="userInput.class"
        placeholder="예) 7"
      />
    </div>
    <div class="user-input">
      <label for="name" class="user-input-label">성명</label>
      <input
        type="text"
        id="name"
        class="user-input-value"
        v-model="userInput.name"
        placeholder="이름"
      />
    </div>
    <div class="user-input">
      <label for="birthday" class="user-input-label">생년월일</label>
      <input
        type="text"
        id="birthday"
        class="user-input-value"
        v-model="userInput.birth"
        placeholder="YY.MM.DD"
      />
    </div>
    <div class="user-input">
      <label for="reasonRadio" class="user-input-label">사유</label>
      <div class="user-input-radio">
        <span
          id="reasonRadio"
          v-for="(item, index) in reasons"
          :key="item + index"
        >
          <label
            :class="
              selected == index
                ? 'radio-label-button-checked'
                : 'radio-label-button'
            "
          >
            <input
              type="radio"
              name="reason"
              :value="index"
              v-model="userInput.reason"
              @change="change(index)"
            />
            {{ item }}
          </label>
        </span>
      </div>
    </div>
    <div class="user-input">
      <label for="aday" class="user-input-label">출결일시</label>
      <input
        type="date"
        name="aday"
        class="user-input-value"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        v-model="attendanceDate"
      />
      <br />
      <input
        type="time"
        name="atime"
        class="user-input-value"
        required
        v-model="attendanceTime"
      />
    </div>
    <div class="user-input">
      <label for="chday" class="user-input-label">변경일시</label>
      <input
        type="date"
        name="chday"
        class="user-input-value"
        required
        pattern="\d{4}-\d{2}-\d{2}"
        v-model="chAttendanceDate"
      />
      <br />
      <input
        type="time"
        name="ctime"
        class="user-input-value"
        required
        v-model="chAttendanceTime"
      />
    </div>
    <div class="user-input">
      <label for="absent-reason" class="user-input-label">변경사유</label>
      <textarea
        ref="reason"
        id="absent-reason"
        class="user-input-textarea"
        v-model="userInput.detailReason"
        placeholder="예) 마우스 고장으로 인한 입실 미클릭"
        rows="3"
        maxlength="69"
        @input="absentLimit"
        @blur="absentLimit"
      />
      <label class="line-font-info">*69자/3줄 까지만 작성가능합니다.</label>
    </div>
    <!-- Signature component -->
    <div class="user-input">
      <label for="signature" class="user-input-label">서명</label>
      <div class="canvas-btn-container">
        <canvas
          id="signature"
          width="166"
          height="94"
          v-on="{
            mousemove: move,
            mouseup: up,
            mousedown: down,
            mouseout: out
          }"
        ></canvas>
        <div class="reset-button-container">
          <button class="reset-button" @click="reset">
            다시 그리기
            <i class="fa-solid fa-rotate-right"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="user-input button-container">
      <button class="submit-button" @click="verifyValidation">만들기</button>
      <button class="submit-button" @click="resetInput">리셋</button>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      areas: ['서울', '대전', '구미', '광주', '부울경'],
      reasons: ['입실 미클릭', '입실 오클릭', '퇴실 미클릭', '퇴실 오클릭'],
      attendanceDate: '',
      chAttendanceDate: '',
      attendanceTime: '',
      chAttendanceTime: '',
      // signature
      canvas: null,
      context: null,
      baseURL: null,
      startX: 0,
      startY: 0,
      drawing: false, // 드로깅 여부를 판단하는 변수
      selected: 0,
      userInput: {
        campus: '', // 캠퍼스 명
        class: '', // 반
        name: '', // 이름
        birth: '', // 생년월일(yyMMdd)
        reason: 0, // 시스템 변경 요청 사유 [0, 1, 2, 3]
        attendanceYear: '', // 출결 일시 년
        attendanceMonth: '', // 출결 일시 월
        attendanceDay: '', // 출결 일시 일
        attendanceHour: '', // 출결 일시 시
        attendanceMinute: '', // 출결 일시 분
        chAttendanceYear: '', // 변경 일시 년
        chAttendanceMonth: '', // 변경 일시 월
        chAttendanceDay: '', // 변경 일시 일
        chAttendanceHour: '', // 변경 일시 시
        chAttendanceMinute: '', // 변경 일실 분
        detailReason: '', // 변경 사유 상세
        signatureUrl: '', // 서명 url
        currentYear: '', // 작성 날짜 년(뒤 2자리)
        currentMonth: '', // 작성 날짜 월
        currentDay: '' // 작성 날짜 일
      },
      checkForm: 0
    };
  },
  methods: {
    ...mapMutations('AttendanceVersionTwoStore', ['SET_USER_INFO']),
    change(radio) {
      this.selected = radio; //리셋 처리 해야합니다.
    },
    draw(curX, curY) {
      this.context.beginPath();
      this.context.moveTo(this.startX, this.startY);
      this.context.lineTo(curX, curY);
      this.context.stroke();
    },
    makeImage() {
      this.baseURL = this.canvas.toDataURL();
    },
    reset() {
      this.context.clearRect(0, 0, 166, 94);
    },
    down: function (event) {
      this.startX = event.offsetX;
      this.startY = event.offsetY;
      this.drawing = true;
    },
    up() {
      this.drawing = false;
    },
    move: function (event) {
      if (!this.drawing) return; // 마우스가 눌러지지 않았으면 리턴
      const curX = event.offsetX;
      const curY = event.offsetY;
      this.draw(curX, curY);
      this.startX = curX;
      this.startY = curY;
    },
    out() {
      this.drawing = false;
    },
    verifyValidation() {
      this.userInput.signatureUrl = this.canvas.toDataURL();

      if (
        !(
          this.userInput.campus &&
          this.userInput.class &&
          this.userInput.name &&
          this.userInput.birth &&
          this.userInput.reason >= 0 &&
          this.userInput.reason < 4 &&
          this.userInput.detailReason &&
          this.userInput.signatureUrl &&
          this.attendanceDate &&
          this.chAttendanceDate &&
          this.attendanceTime &&
          this.chAttendanceTime
        )
      ) {
        alert('모든 정보를 입력해주세요.');
      } else {
        let attDate = this.attendanceDate.split('-');
        let chAttDate = this.chAttendanceDate.split('-');
        let attTime = this.attendanceTime.split(':');
        let chAttTime = this.chAttendanceTime.split(':');

        let currentDate = new Date();

        let currentYear = currentDate.getFullYear() + '';
        let currentMonth = currentDate.getMonth() + 1;
        let currentDay = currentDate.getDate();

        this.userInput.attendanceYear = attDate[0];
        this.userInput.attendanceMonth = attDate[1];
        this.userInput.attendanceDay = attDate[2];
        this.userInput.chAttendanceYear = chAttDate[0];
        this.userInput.chAttendanceMonth = chAttDate[1];
        this.userInput.chAttendanceDay = chAttDate[2];
        this.userInput.attendanceHour = attTime[0];
        this.userInput.attendanceMinute = attTime[1];
        this.userInput.chAttendanceHour = chAttTime[0];
        this.userInput.chAttendanceMinute = chAttTime[1];
        this.userInput.currentYear = currentYear.slice(2);
        this.userInput.currentMonth = currentMonth;
        this.userInput.currentDay = currentDay;

        this.SET_USER_INFO(this.userInput);
        this.$router.push({
          name: 'previewTwo'
        });
      }
    },
    resetInput() {
      this.attendanceDate = '';
      this.chAttendanceDate = '';
      this.attendanceTime = '';
      this.chAttendanceTime = '';
      this.selected = 0;
      this.userInput = {
        campus: '',
        class: '',
        name: '',
        birth: '',
        reason: 0,
        attendanceYear: '',
        attendanceMonth: '',
        attendanceDay: '',
        chAttendanceYear: '',
        chAttendanceMonth: '',
        chAttendanceDay: '',
        attendanceHour: '',
        attendanceMinute: '',
        chAttendanceHour: '',
        chAttendanceMinute: '',
        currentYear: '',
        currentMonth: '',
        currentDay: '',
        detailReason: '',
        signatureUrl: ''
      };
      this.reset();
    },
    absentLimit() {
      let h = this.$refs.reason.scrollHeight;

      if (h > 55) {
        let lng = this.userInput.detailReason.length;
        this.userInput.detailReason = this.userInput.detailReason.substring(
          0,
          lng - 1
        );
        this.checkForm = 1;
      } else {
        this.checkForm = 0;
      }
    }
  },
  mounted() {
    const canvas = document.querySelector('#signature');
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    // 선 굵기를 2로 설정, 색깔은 검정색
    this.context.lineWidth = 2;
    this.context.strokeStyle = 'black';
  }
};
</script>

<style scoped>
#reasonRadio {
  cursor: pointer;

  /* 추가하여 텍스트 선택효과 방지 */
  user-select: none;
}

.reset-button {
  user-select: none;
}
@import '@/assets/css/canvas.css';
</style>
