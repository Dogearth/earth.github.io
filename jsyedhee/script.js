  // dis
const userId = '603384047321743370'; // Discord User ID
function fetchProfile() {
  fetch(`https://api.lanyard.rest/v1/users/${userId}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        if (!data.success) throw new Error("API ไม่ตอบสนอง");

        const d = data.data;
        const username = d.discord_user.username + d.discord_user.discriminator;
        const status = d.discord_status;

        let avatarUrl = '';
        if (d.discord_user.avatar) {
          const isAnimated = d.discord_user.avatar.startsWith('a_');
          const ext = isAnimated ? 'gif' : 'png';
          avatarUrl = `https://cdn.discordapp.com/avatars/${d.discord_user.id}/${d.discord_user.avatar}.${ext}?size=512`;
        } else {
          avatarUrl = `https://cdn.discordapp.com/embed/avatars/${parseInt(d.discord_user.discriminator) % 5}.png`;
        }

        document.getElementById('username').textContent = username;
        document.getElementById('status').textContent = `Status: ${status}`;
        document.getElementById('avatar').style.backgroundImage = `url('${avatarUrl}')`;

        const statusIndicator = document.getElementById('status-indicator');
        statusIndicator.className = 'status-indicator'; // reset

        switch (status) {
          case 'online':
            statusIndicator.classList.add('status-online');
            break;
          case 'idle':
            statusIndicator.classList.add('status-idle');
            break;
          case 'dnd':
            statusIndicator.classList.add('status-dnd');
            break;
          default:
            statusIndicator.classList.add('status-offline');
        }
      })
      .catch(err => {
        console.error(err);
        document.getElementById('username').textContent = 'Failed to load profile';
        document.getElementById('status').textContent = '';
      });
  }

  function enterSite() {
    document.querySelector('.enter-btn').style.display = 'none';
    document.getElementById('profile').style.display = 'flex';

    fetchProfile(); // โหลดครั้งแรก
    setInterval(fetchProfile, 5000); // โหลดซ้ำทุก 5 วินาที (เรียลไทม์ประมาณนึง)
  }

const audio = document.getElementById("myAudio");
    // ตั้งความดังไว้ที่ 10%
    audio.volume = 0.1;

    document.addEventListener("keydown", function (event) {
      if (event.code === "Space") {
        event.preventDefault(); // ป้องกัน scroll หน้าเว็บ
        if (audio.paused) {
          audio.play();
        } else {
          audio.pause();
        }
      }
    });
