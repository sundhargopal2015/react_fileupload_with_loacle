<?php
    $files = $_FILES;
    $upload_dir = 'files';

    foreach($files as $key => $file) {
        $filename = $upload_dir.'/'. $files[$key]['name'];
        move_uploaded_file($files[$key]['tmp_name'], $filename);
    }

    return print_r(json_encode($files));
?>