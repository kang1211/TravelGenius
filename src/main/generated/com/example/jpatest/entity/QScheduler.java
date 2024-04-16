package com.example.jpatest.entity;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScheduler is a Querydsl query type for Scheduler
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScheduler extends EntityPathBase<Scheduler> {

    private static final long serialVersionUID = 1601332226L;

    public static final QScheduler scheduler = new QScheduler("scheduler");

    public final StringPath arrivalHour = createString("arrivalHour");

    public final StringPath arrivalMinute = createString("arrivalMinute");

    public final StringPath departureHour = createString("departureHour");

    public final StringPath departureMinute = createString("departureMinute");

    public final NumberPath<Long> id = createNumber("id", Long.class);

    public final StringPath trip_duration_end = createString("trip_duration_end");

    public final StringPath trip_duration_start = createString("trip_duration_start");

    public QScheduler(String variable) {
        super(Scheduler.class, forVariable(variable));
    }

    public QScheduler(Path<? extends Scheduler> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScheduler(PathMetadata metadata) {
        super(Scheduler.class, metadata);
    }

}

