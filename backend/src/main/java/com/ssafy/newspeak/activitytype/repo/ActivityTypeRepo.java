package com.ssafy.newspeak.activitytype.repo;

import com.ssafy.newspeak.activitytype.entity.ActivityType;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ActivityTypeRepo extends JpaRepository<ActivityType,Long> {

}
