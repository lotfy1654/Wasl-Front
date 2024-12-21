import Swal from 'sweetalert2';

const showUnauthorizedAlert = () => {
    Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'You are not authorized to perform this action',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            const progressBar = Swal.getPopup()?.querySelector(".swal2-timer-progress-bar");
            if (progressBar) {
                progressBar.style.background = "#d33";
            }
        },
        willClose: () => {
            localStorage.removeItem('wasl-token');
            window.location.href = '/auth/signin';
        }
    });
};

export default showUnauthorizedAlert;
