$sql = "SELECT h, COUNT(h) as ch
        FROM
          (SELECT location, mac, hour(MAX(timestamp)) as h
          FROM blescan 
          WHERE location like '".$the_location."' AND timestamp BETWEEN '".$mrg_date." 00:00:00' AND '".$mrg_date." 23:59:59' 
          GROUP BY mac
          ORDER BY timestamp) AS g_mac
        GROUP BY h";